import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin, { credential, messaging } from 'firebase-admin';
import {
  Message,
  MessagingOptions,
  MessagingPayload,
  NotificationMessagePayload,
} from 'firebase-admin/lib/messaging/messaging-api';
// var serviceAccount = require('/src/common/services/firebase-admin/');
// import * as serviceAccount from './serviceAccountKey.json';

// import * as serviceAccount from './serviceAccountKey.json';
// import serviceAccount from
@Injectable()
export class FirebaseAdminService {
  private firebaseAdmin: admin.app.App;
  constructor(private configService: ConfigService) {
    const serviceAccount = this.configService.get<string>('FIREBASE_KEY');
    this.firebaseAdmin = admin.initializeApp({
      credential: credential.cert(
        JSON.parse(serviceAccount) as admin.ServiceAccount,
      ),
    });
  }

  private sendMessage(message: Message) {
    return this.firebaseAdmin.messaging().send(message);
  }

  private sendMultipleDevices(messages: Message[]) {
    return this.firebaseAdmin.messaging().sendEach(messages);
  }

  private sendTopic(
    topic: string,
    payload: MessagingPayload,
    options?: MessagingOptions,
  ) {
    return this.firebaseAdmin.messaging().sendToTopic(topic, payload, options);
  }

  sendMessageSpecificDevice(fcmToken: string, userId: number) {
    // prepare message from body sent from client
    const message: Message = {
      token: fcmToken,
      data: {
        userId: `${userId}`,
        fcmToken,
      },
      notification: {
        title: '------title message------',
        body: '------title body------',
        imageUrl:
          'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      },
    };

    console.log('message', message);

    return this.sendMessage(message)
      .then((value) => console.log('success', value))
      .catch((error) => console.warn(error));
  }
}
