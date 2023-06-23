import { IsString, IsNotEmpty, Validate } from 'class-validator';
import { IsDateWithoutTime } from '../utils/validators/IsDateWithoutTime';
import { IsTime } from '../utils/validators/IsTime';

export class AddActivityDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsTime)
  from: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsTime)
  to: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsDateWithoutTime)
  date: string;
}
