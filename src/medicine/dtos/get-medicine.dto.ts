import { PaginationDto } from '../dto/pagination.dto';

export class GetMedicinesDto extends PaginationDto {
  query: string;
  orderBy: string;
}
