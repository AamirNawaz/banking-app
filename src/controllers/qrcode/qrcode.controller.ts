import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QRCodeService } from '../../services/qrcode/qrcode.service';
import { CreateQRCodeDto } from '../../dto/qrcode/create-qrcode.dto';
import { UpdateQRCodeDto } from '../../dto/qrcode/update-qrcode.dto';
import { QRCode } from '../../entities/QRCode.entity';
import { UserGuard } from 'src/guard/user.guard';

@Controller('qrcodes')
export class QRCodeController {
  constructor(private readonly qrCodeService: QRCodeService) {}

  @Post()
  @UseGuards(UserGuard)
  create(
    @Req() req,
    @Body() createQRCodeDto: CreateQRCodeDto,
  ): Promise<QRCode> {
    const userId = req.user.sub;
    return this.qrCodeService.create(userId, createQRCodeDto);
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
