import { IsString, IsNotEmpty, Validate } from 'class-validator';
import { IsDateWithoutTime } from '../utils/validators/IsDateWithoutTime';

export class GetDayDTO {
  @IsString()
  @IsNotEmpty()
  @Validate(IsDateWithoutTime)
  date: string;
}

export class AddDayDTO {
  @IsString()
  @IsNotEmpty()
  @Validate(IsDateWithoutTime)
  date: string;
}
