import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @Max(100)
  page: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit: number;
}

export enum SORT {
  ASC = 'asc',
  DESC = 'desc',
}

export class KeywordDto {
  @IsOptional()
  @IsEnum(SORT)
  orderBy: SORT;

  @IsOptional()
  query: string;
}
