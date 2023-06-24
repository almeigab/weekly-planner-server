import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class AddActivityDTO {
  constructor(name: string, weekDay: Number, from: string, to: string) {
    this.name = name;
    this.weekDay = weekDay;
    this.from = from;
    this.to = to;
  }

  @IsString()
  @IsNotEmpty()
  name: string;

  @Max(6)
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  weekDay: Number;

  @IsDateString()
  @IsNotEmpty()
  from: string;

  @IsDateString()
  @IsNotEmpty()
  to: string;
}
