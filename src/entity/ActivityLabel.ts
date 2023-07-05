import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Activity } from './Activity';

@Entity()
export class ActivityLabel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Activity, (activity) => activity.label)
  activities: Activity[];
}
