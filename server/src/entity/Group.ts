import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne} from "typeorm"
import { CalendarDTO, GroupDTO, UserDTO } from "../../../models";
import { Calendar } from "./Calendar";
import { User } from "./User";

@Entity()
export class Group implements GroupDTO{
    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    name: string;
   
    @Column("simple-array")
    studentnames: string[];

    @ManyToMany(() => Calendar,  (calendar) => calendar.groups)
    classes: CalendarDTO[];

    @ManyToOne(type => User, (user) => user.groups)
    teacher: UserDTO;

}