import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Day } from './Day';

@Entity()
export class Week {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstDayDate: Date;

  @OneToMany(() => Day, (day) => day.week)
  days: Day[];
}
