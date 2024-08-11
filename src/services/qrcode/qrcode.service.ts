import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QRCode } from './qrcode.entity';
import { CreateQRCodeDto } from './dto/create-qrcode.dto';
import { UpdateQRCodeDto } from './dto/update-qrcode.dto';

@Injectable()
export class QRCodeService {
  constructor(
    @InjectRepository(QRCode)
    private readonly qrCodeRepository: Repository<QRCode>,
  ) {}

  async create(createQRCodeDto: CreateQRCodeDto): Promise<QRCode> {
    const qrCode = this.qrCodeRepository.create(createQRCodeDto);
    return this.qrCodeRepository.save(qrCode);
  }

  async findAll(): Promise<QRCode[]> {
    return this.qrCodeRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<QRCode> {
    return this.qrCodeRepository.findOne({
      where: { qr_code_id: id },
      relations: ['user'],
    });
  }

  async update(id: number, updateQRCodeDto: UpdateQRCodeDto): Promise<QRCode> {
    await this.qrCodeRepository.update(id, updateQRCodeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.qrCodeRepository.delete(id);
  }
}
