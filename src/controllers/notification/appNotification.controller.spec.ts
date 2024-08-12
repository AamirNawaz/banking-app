import { Test, TestingModule } from '@nestjs/testing';
import { AppNotificationController } from './appNotification.controller';

describe('NotificationController', () => {
  let controller: AppNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppNotificationController],
    }).compile();

    controller = module.get<AppNotificationController>(
      AppNotificationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
