import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm"
import { CalendarDTO, GroupDTO } from "../../../models";
import {Group } from "./Group";

@Entity()
export class Calendar implements CalendarDTO{
    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    week: 1 | 2 | 3;

    @Column()
    day: 1 | 2 | 3 | 4 | 5;

    @Column()
    timeofclass: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    @Column()
    activity: string;

    @Column()
    description: string;

    @Column()
    classroom: "teljes labor" | "kémia labor" | "fizika labor";

    @ManyToMany(() => Group,  (group) => group.classes, { eager: true })
    @JoinTable()
    groups: GroupDTO[]; 

    @Column()
    istimetableclass: 0 | 1;
}