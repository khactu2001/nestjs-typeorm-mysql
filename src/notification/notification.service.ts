import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { RegisterFCMTokenDto } from './dto/register-fcm-token.dto';
import { FirebaseAdminService } from 'src/common/services/firebase-admin/firebase.admin';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notiRepo: Repository<NotificationEntity>,
    private fbAdmin: FirebaseAdminService,
  ) {}

  registerFCMToken(registerFCMObject: RegisterFCMTokenDto) {
    const registerRecord = this.notiRepo.create(registerFCMObject);
    return this.notiRepo.save(registerRecord);
  }

  async pushNotification(userId: number) {
    const userReceivedNoti = await this.notiRepo.findOne({
      where: {
        userId,
      },
    });

    if (userReceivedNoti) {
      const fcmToken = userReceivedNoti.fcmToken;
      console.log('fcmToken', fcmToken);
      this.fbAdmin.sendMessageSpecificDevice(fcmToken, userId);
    }

    return userReceivedNoti;
  }
}
