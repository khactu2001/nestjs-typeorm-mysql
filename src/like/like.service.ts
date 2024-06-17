import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dtos/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  // import repository to query db
  constructor(
    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
  ) {}
  createLike(likeBody: CreateLikeDto) {
    const newLike = this.likeRepository.create(likeBody);
    return this.likeRepository.save(newLike);
  }

  getLikesByUserId(id: number) {
    return this.likeRepository.find({
      where: {
        userId: id,
      },
      relations: {
        user: true,
        medicine: true,
      },
    });
  }
}
