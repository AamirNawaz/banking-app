import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppNotification } from 'src/entities/AppNotification.entity';
import { AppNotificationService } from 'src/services/notification/appNotification.service';
import { AppNotificationController } from './appNotification.controller';
import { User } from 'src/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppNotification, User])],
  providers: [AppNotificationService],
  controllers: [AppNotificationController],
})
export class AppNotificationModule {}
