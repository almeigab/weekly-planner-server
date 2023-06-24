import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class AddActivityDTO {
  constructor(name: string, weekDay: number, from: string, to: string) {
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
  weekDay: number;

  @IsDateString()
  @IsNotEmpty()
  from: string;

  @IsDateString()
  @IsNotEmpty()
  to: string;
}

export class GetActivitiesDTO {
  constructor(weekDay?: string) {
    this.weekDay = weekDay;
  }

  @IsNumberString()
  @IsOptional()
  weekDay?: string;
}
