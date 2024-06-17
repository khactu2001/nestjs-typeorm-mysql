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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin@1234',
      database: 'tut_dev',
      entities: [User, Medicine, LikeEntity, FavoriteEntity],
      synchronize: true,
    }),
    UsersModule,
    MedicineModule,
    LikeModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
