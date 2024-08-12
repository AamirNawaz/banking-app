import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QRCode } from 'src/entities/QRCode.entity';
import { QRCodeService } from '../../services/qrcode/qrcode.service';
import { QRCodeController } from '../../controllers/qrcode/qrcode.controller';
import { User } from 'src/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QRCode, User])],
  providers: [QRCodeService],
  controllers: [QRCodeController],
})
export class QrcodeModule {}
