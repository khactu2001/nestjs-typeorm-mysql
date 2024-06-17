import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';
import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateMedicineDto } from './dtos/create-medicine.dto';
import { GetMedicinesDto } from './dtos/get-medicine.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
  ) {}

  createMedicine(medicines: CreateMedicineDto[]) {
    return this.medicineRepository.insert(medicines);
  }

  // async getMedicines(params: GetMedicinesDto) {
  //   const { page, limit } = params;
  //   const [result, total] = await this.medicineRepository.findAndCount({
  //     skip: page,
  //     take: limit,
  //   });
  //   // const returnObject = {
  //   //   data: result,
  //   //   pagination: {
  //   //     page,
  //   //     limit,
  //   //   },
  //   // };
  //   // return returnObject;
  //   return paginate<Medicine>(result, total, params);
  // }

  async paginate(
    options: IPaginationOptions,
    searchOptions?: FindOptionsWhere<Medicine> | FindManyOptions<Medicine>,
  ) {
    return paginate<Medicine>(this.medicineRepository, options, searchOptions);
  }
}
