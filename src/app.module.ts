import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/data-source';
import { RoleModule } from './controllers/role/role.module';
import { UserModule } from './controllers/user/user.module';
import { ReviewModule } from './controllers/review/review.module';
import { QrcodeModule } from './controllers/qrcode/qrcode.module';
import { PaymentModule } from './controllers/payment/payment.module';
import { NotificationModule } from './controllers/notification/notification.module';
import { BookingModule } from './controllers/booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource),
    UserModule,
    RoleModule,
    ReviewModule,
    QrcodeModule,
    PaymentModule,
    NotificationModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
