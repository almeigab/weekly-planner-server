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
  constructor(
    name: string,
    weekDay: number,
    from: string,
    to: string,
    label?: number
  ) {
    this.name = name;
    this.weekDay = weekDay;
    this.from = from;
    this.to = to;
    if (label) this.label = label;
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

  @IsInt()
  @IsOptional()
  label: number;
}

export class GetActivitiesDTO {
  constructor(weekDay?: string) {
    this.weekDay = weekDay;
  }

  @IsNumberString()
  @IsOptional()
  weekDay?: string;
}
