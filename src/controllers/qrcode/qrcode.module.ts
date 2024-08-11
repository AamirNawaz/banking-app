import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QRCode } from 'src/entities/QRCode.entity';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';
import { QrcodeController } from './qrcode.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QRCode])],
  providers: [QrcodeService],
  controllers: [QrcodeController],
})
export class QrcodeModule {}
