import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dtos/create-medicine.dto';
import { GetMedicinesDto } from './dtos/get-medicine.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Post()
  createMedicine(@Body() medicine: CreateMedicineDto[]) {
    return this.medicineService.createMedicine(medicine);
  }

  @Get()
  getMedicines(@Query() query: PaginationDto) {
    // return this.medicineService.getMedicines(query);
    return this.medicineService.paginate(query);
  }
}
