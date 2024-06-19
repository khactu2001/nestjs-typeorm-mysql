import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';
import { MedicineModule } from './medicine/medicine.module';
import { Medicine } from './medicine/entities/medicine.entity';
import { LikeModule } from './like/like.module';
import { LikeEntity } from './like/entities/like.entity';
import { FavoriteModule } from './favorite/favorite.module';
import { FavoriteEntity } from './favorite/entities/favorite.entity';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SendEmailEntity } from './email/entities/email.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin@1234',
      database: 'tut_dev',
      entities: [User, Medicine, LikeEntity, FavoriteEntity, SendEmailEntity],
      synchronize: true,
    }),

    UsersModule,
    MedicineModule,
    LikeModule,
    FavoriteModule,
    EmailModule,

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAILER_HOST'),
          port: configService.get('MAILER_PORT'),
          secure: true,
          auth: {
            user: configService.get('MAILER_USER'),
            pass: configService.get('MAILER_PASSWORD'),
          },
          logger: true, // enable logging
          debug: true, // enable debug output
        },
        defaults: {
          from: '"nestjs" <no-reply@gmail.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
