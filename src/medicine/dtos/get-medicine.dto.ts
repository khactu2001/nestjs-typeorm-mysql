import { IntersectionType } from '@nestjs/mapped-types';
import { KeywordDto, PaginationDto } from 'src/dto/app.dto';

/**
 * IntersectionType combines 2 or many dtos
 */
export class GetMedicinesDto extends IntersectionType(
  PaginationDto,
  KeywordDto,
) {}
