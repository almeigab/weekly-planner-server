import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class AddActivityDTO {
  constructor(
    name: string,
    from: string | Date,
    to: string | Date,
    date: string | Date
  ) {
    this.name = name;
    this.from = new Date(from);
    this.to = new Date(to);
    this.date = new Date(date);
  }

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsNotEmpty()
  from: Date;

  @IsDate()
  @IsNotEmpty()
  to: Date;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
