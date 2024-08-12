import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QRCode } from '../../entities/qrcode.entity';
import { CreateQRCodeDto } from '../../dto/QRcode/create-qrcode.dto';
import { UpdateQRCodeDto } from '../../dto/QRcode/update-qrcode.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class QRCodeService {
  constructor(
    @InjectRepository(QRCode)
    private readonly qrCodeRepository: Repository<QRCode>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createQRCodeDto: CreateQRCodeDto): Promise<QRCode> {
    const user = await this.userRepository.findOne({
      where: { user_id: createQRCodeDto.user },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createQRCodeDto.user} not found`,
      );
    }

    const qrCode = new QRCode();
    qrCode.user = user;
    qrCode.qr_code_data = createQRCodeDto.qr_code_data;
    qrCode.created_at = createQRCodeDto.created_at;
    qrCode.updated_at = createQRCodeDto.updated_at;

    return this.qrCodeRepository.save(qrCode);
  }

  async findAll(): Promise<QRCode[]> {
    return this.qrCodeRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<QRCode> {
    const qrCode = await this.qrCodeRepository.findOne({
      where: { qr_code_id: id },
      relations: ['user'],
    });

    if (!qrCode) {
      throw new NotFoundException(`QR Code with ID ${id} not found`);
    }

    return qrCode;
  }

  async update(id: number, updateQRCodeDto: UpdateQRCodeDto): Promise<QRCode> {
    let user: User | undefined;
    if (updateQRCodeDto.user) {
      user = await this.userRepository.findOne({
        where: { user_id: updateQRCodeDto.user },
      });
      if (!user) {
        throw new NotFoundException(
          `User with ID ${updateQRCodeDto.user} not found`,
        );
      }
    }

    const qrCode = await this.findOne(id);

    if (user) qrCode.user = user;
    if (updateQRCodeDto.qr_code_data)
      qrCode.qr_code_data = updateQRCodeDto.qr_code_data;
    if (updateQRCodeDto.created_at)
      qrCode.created_at = updateQRCodeDto.created_at;
    if (updateQRCodeDto.updated_at)
      qrCode.updated_at = updateQRCodeDto.updated_at;

    return this.qrCodeRepository.save(qrCode);
  }

  async remove(id: number): Promise<void> {
    const result = await this.qrCodeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`QR Code with ID ${id} not found`);
    }
  }
}
