import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dtos/create-medicine.dto';
import { GetMedicinesDto } from './dtos/get-medicine.dto';
import { Like } from 'typeorm';
import { isNotIn } from 'class-validator';
import { Medicine } from './entities/medicine.entity';

@Controller('medicine')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Post()
  createMedicine(@Body() medicine: CreateMedicineDto[]) {
    return this.medicineService.createMedicine(medicine);
  }

  @Get()
  getMedicines(@Query() params: GetMedicinesDto) {
    const { query: search, orderBy, ...rest } = params;
    const searchId = parseInt(search);
    return this.medicineService.paginate(rest, {
      where: search
        ? [
            { name: Like(`%${search}%`) },
            !isNaN(searchId) && { id: Like(searchId) },
          ]
        : undefined,
      order: isNotIn(orderBy, ['asc', 'desc', 'ASC', 'DESC'])
        ? undefined
        : {
            id: orderBy,
          },
    });
  }
}
