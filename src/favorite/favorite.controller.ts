import { Body, Controller, Post } from '@nestjs/common';
import { AddFavoriteDto } from './dtos/add-favorite.dto';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}
  @Post()
  addFavorite(@Body() bodyAddFavorite: AddFavoriteDto) {
    return this.favoriteService.addFavorite(bodyAddFavorite);
  }
}
