import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Day } from './Day';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'time' })
  from: Date;

  @Column({ type: 'time' })
  to: Date;

  @Column()
  checked: boolean;

  @ManyToOne(() => Day, (day) => day.activities, {
    cascade: true,
  })
  day: Day;
}
