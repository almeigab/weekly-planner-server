import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Week } from './Week';
import { Activity } from './Activity';

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => Week, (week) => week.days, {
    cascade: true,
  })
  week: Week;

  @OneToMany(() => Activity, (activity) => activity.day)
  activities: Activity[];
}
