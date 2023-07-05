import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {
  parseDateToTimeString,
  parseTimeStringToDate,
} from '../utils/dateTime';
import { ActivityLabel } from './ActivityLabel';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  weekDay: number;

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

  @ManyToOne(() => ActivityLabel, (activityLabel) => activityLabel.activities)
  label: ActivityLabel;
}
