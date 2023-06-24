import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Day } from './Day';
import {
  parseDateToTimeString,
  parseTimeStringToDate,
} from '../utils/dateTime';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'time',
    transformer: {
      to: (value: Date) => parseDateToTimeString(value),
      from: (value: string) => parseTimeStringToDate(value),
    },
  })
  from: Date;

  @Column({
    type: 'time',
    transformer: {
      to: (value: Date) => parseDateToTimeString(value),
      from: (value: string) => parseTimeStringToDate(value),
    },
  })
  to: Date;

  @Column({ default: false })
  checked: boolean;

  @ManyToOne(() => Day, (day) => day.activities, {
    cascade: true,
  })
  day: Day;
}
