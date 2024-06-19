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

@Module({
  imports: [
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

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        // port: 587,
        // ignoreTLS: true,
        secure: true,
        auth: {
          user: 'lktubom@gmail.com',
          pass: 'tebvvsadwkboghbp', //fqke fmwj qeyk nunj
        },
        // tls: {
        //   rejectUnauthorized: false,
        // },
        logger: true, // enable logging
        debug: true, // enable debug output
      },
      defaults: {
        from: '"nestjs" <lktubom@gmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'localhost',
    //     port: 1025,
    //     ignoreTLS: true,
    //     secure: false,
    //     auth: {
    //       user: process.env.MAILDEV_INCOMING_USER,
    //       pass: process.env.MAILDEV_INCOMING_PASS,
    //     },
    //   },
    //   defaults: {
    //     from: '"No Reply" <no-reply@localhost>',
    //   },
    //   preview: true,
    //   template: {
    //     dir: process.cwd() + '/template/',
    //     adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
