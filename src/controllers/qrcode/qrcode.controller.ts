import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { QRCodeService } from '../../services/qrcode/qrcode.service';
import { CreateQRCodeDto } from '../../dto/qrcode/create-qrcode.dto';
import { UpdateQRCodeDto } from '../../dto/qrcode/update-qrcode.dto';
import { QRCode } from '../../entities/QRCode.entity';

@Controller('qrcodes')
export class QRCodeController {
  constructor(private readonly qrCodeService: QRCodeService) {}

  @Post()
  create(@Body() createQRCodeDto: CreateQRCodeDto): Promise<QRCode> {
    return this.qrCodeService.create(createQRCodeDto);
  }

  @Get()
  findAll(): Promise<QRCode[]> {
    return this.qrCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<QRCode> {
    return this.qrCodeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateQRCodeDto: UpdateQRCodeDto,
  ): Promise<QRCode> {
    return this.qrCodeService.update(id, updateQRCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.qrCodeService.remove(id);
  }
}
