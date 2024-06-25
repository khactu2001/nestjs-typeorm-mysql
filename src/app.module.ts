import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { SendEmailEntity } from './email/entities/email.dto';
import { FavoriteEntity } from './favorite/entities/favorite.entity';
import { FavoriteModule } from './favorite/favorite.module';
import { LikeEntity } from './like/entities/like.entity';
import { LikeModule } from './like/like.module';
import { Medicine } from './medicine/entities/medicine.entity';
import { MedicineModule } from './medicine/medicine.module';
import { NotificationEntity } from './notification/entities/notification.entity';
import { NotificationModule } from './notification/notification.module';
import { User } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          User,
          Medicine,
          LikeEntity,
          FavoriteEntity,
          SendEmailEntity,
          NotificationEntity,
        ],
        synchronize: true,
      }),
    }),

    UsersModule,
    MedicineModule,
    LikeModule,
    FavoriteModule,
    EmailModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
