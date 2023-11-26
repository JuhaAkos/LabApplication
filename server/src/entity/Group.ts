import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn} from "typeorm"
import { CalendarDTO, GroupDTO, UserDTO } from "../../../models";
import { Calendar } from "./Calendar";
import { User } from "./User";

@Entity()
export class Group implements GroupDTO{
    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    name: string;
   
    @Column()
    studentnames: string;

    @ManyToMany(() => Calendar,  (calendar) => calendar.groups)
    classes: CalendarDTO[];

    @ManyToOne(type => User, (user) => user.groups,)
    @JoinColumn({ name: "teacherId" })
    teacher: UserDTO;

    //needed because data doesn't get stored on this side of the relation
    @Column()
    teacherId: number;
}