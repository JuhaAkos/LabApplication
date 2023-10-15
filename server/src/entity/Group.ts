import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable} from "typeorm"
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

    @OneToMany(type => User, (user) => user.groups)
    teacher: UserDTO;

}