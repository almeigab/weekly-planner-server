import { IsNotEmpty, IsDate } from 'class-validator';

export class GetDayDTO {
  constructor(date: string | Date) {
    this.date = new Date(date);
  }

  @IsDate()
  @IsNotEmpty()
  date: Date;
}

export class AddDayDTO {
  constructor(date: string | Date) {
    this.date = new Date(date);
  }

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
