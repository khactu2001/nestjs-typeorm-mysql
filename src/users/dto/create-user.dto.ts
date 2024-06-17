import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
  ValidateIf,
  ValidatePromise,
} from 'class-validator';
import { Medicine } from 'src/medicine/entities/medicine.entity';

export class CreateNormalUserDto {
  @IsString()
  @IsNotEmpty()
  @Max(10)
  @Min(2)
  name: string;

  @IsNumber()
  @Min(6, { message: 'age must be greater than 6' })
  age: number;

  //   check is email and not duplicate with other users
  @IsEmail()
  //   @ValidatePromise()
  email: string;

  //  check password is strong
  @IsNotEmpty()
  @IsString()
  //   @ValidateIf((o: CreateNormalUserDto) => {
  //     const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
  //     return pattern.test(o.password);
  //   })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/, {
    message: 'password is not strong',
  })
  password: string;

  medicines: Medicine[];
}
