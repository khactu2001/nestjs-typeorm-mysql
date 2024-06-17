import { Injectable } from '@nestjs/common';
import { AddFavoriteDto } from './dtos/add-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteService: Repository<FavoriteEntity>,
  ) {}

  addFavorite(body: AddFavoriteDto) {
    const newFavorite = this.favoriteService.create(body);
    return this.favoriteService.save(newFavorite);
  }
}
