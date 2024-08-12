import { Test, TestingModule } from '@nestjs/testing';
import { QRCodeService } from './qrcode.service';
import { QRCode } from '../../entities/qrcode.entity';
import { User } from '../../entities/user.entity';
import { Repository, DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateQRCodeDto } from '../../dto/QRcode/create-qrcode.dto';
import { UpdateQRCodeDto } from '../../dto/QRcode/update-qrcode.dto';

describe('QRCodeService', () => {
  let service: QRCodeService;
  let qrCodeRepository: Repository<QRCode>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QRCodeService,
        {
          provide: getRepositoryToken(QRCode),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<QRCodeService>(QRCodeService);
    qrCodeRepository = module.get<Repository<QRCode>>(
      getRepositoryToken(QRCode),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a new QR Code', async () => {
      const createQRCodeDto: CreateQRCodeDto = {
        user: 1,
        qr_code_data: 'some data',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const user = { user_id: 1 } as User;
      const qrCode = { ...createQRCodeDto, user } as QRCode;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(qrCodeRepository, 'save').mockResolvedValue(qrCode);

      expect(await service.create(createQRCodeDto)).toEqual(qrCode);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const createQRCodeDto: CreateQRCodeDto = {
        user: 1,
        qr_code_data: 'some data',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createQRCodeDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of QR Codes', async () => {
      const qrCodes: QRCode[] = [
        {
          qr_code_id: 1,
          user: { user_id: 1 } as User,
          qr_code_data: 'some data',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      jest.spyOn(qrCodeRepository, 'find').mockResolvedValue(qrCodes);

      expect(await service.findAll()).toEqual(qrCodes);
    });
  });

  describe('findOne', () => {
    it('should return a single QR Code', async () => {
      const qrCode: QRCode = {
        qr_code_id: 1,
        user: { user_id: 1 } as User,
        qr_code_data: 'some data',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(qrCodeRepository, 'findOne').mockResolvedValue(qrCode);

      expect(await service.findOne(1)).toEqual(qrCode);
    });

    it('should throw NotFoundException if QR Code is not found', async () => {
      jest.spyOn(qrCodeRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the QR Code', async () => {
      const existingQRCode: QRCode = {
        qr_code_id: 1,
        user: { user_id: 1 } as User,
        qr_code_data: 'old data',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const updateQRCodeDto: UpdateQRCodeDto = {
        qr_code_data: 'updated data',
        user: 1,
      };
      const user = { user_id: 1 } as User;
      const updatedQRCode = {
        ...existingQRCode,
        ...updateQRCodeDto,
        user,
      } as QRCode;

      jest.spyOn(qrCodeRepository, 'findOne').mockResolvedValue(existingQRCode);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(qrCodeRepository, 'save').mockResolvedValue(updatedQRCode);

      expect(await service.update(1, updateQRCodeDto)).toEqual(updatedQRCode);
    });

    it('should throw NotFoundException if QR Code to update is not found', async () => {
      const updateQRCodeDto: UpdateQRCodeDto = {
        qr_code_data: 'updated data',
      };

      jest.spyOn(qrCodeRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, updateQRCodeDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if user to update is not found', async () => {
      const existingQRCode: QRCode = {
        qr_code_id: 1,
        user: { user_id: 1 } as User,
        qr_code_data: 'old data',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const updateQRCodeDto: UpdateQRCodeDto = {
        user: 2,
      };

      jest.spyOn(qrCodeRepository, 'findOne').mockResolvedValue(existingQRCode);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, updateQRCodeDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete the QR Code', async () => {
      jest
        .spyOn(qrCodeRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      await service.remove(1);

      expect(qrCodeRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if QR Code to delete is not found', async () => {
      jest
        .spyOn(qrCodeRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as DeleteResult);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
