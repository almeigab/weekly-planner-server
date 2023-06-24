import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  parseDateToTimeString,
  parseTimeStringToDate,
} from '../utils/dateTime';

export enum ActivityLabel {
  BLANK = 0,
  TASK,
  LEISURE,
  WORK,
  STUDY,
}

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  weekDay: Number;

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

  @Column({
    type: 'enum',
    enum: ActivityLabel,
    default: ActivityLabel.BLANK,
  })
  label: ActivityLabel;
}
