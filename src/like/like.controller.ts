import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLikeDto } from './dtos/create-like.dto';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}
  @Post()
  createLike(@Body() likeBody: CreateLikeDto) {
    return this.likeService.createLike(likeBody);
  }

  @Get(':userId')
  getLikesByUserId(@Param('userId') id: number) {
    return this.likeService.getLikesByUserId(id);
  }
}
