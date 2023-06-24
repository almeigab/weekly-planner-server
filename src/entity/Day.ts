import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // ManyToOne,
  OneToMany,
} from 'typeorm';
// import { Week } from './Week';
import { Activity } from './Activity';
import {
  parseDateStringToDate,
  parseDateToDateString,
} from '../utils/dateTime';

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    transformer: {
      to: (value: Date) => parseDateToDateString(value),
      from: (value: string) => parseDateStringToDate(value),
    },
  })
  date: Date;

  // @ManyToOne(() => Week, (week) => week.days, {
  //   cascade: true,
  // })
  // week: Week;

  @OneToMany(() => Activity, (activity) => activity.day)
  activities: Activity[];
}
