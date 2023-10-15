import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { GroupDTO, UserDTO } from "../../../models";
import { Group } from "./Group";

@Entity()
export class User implements UserDTO{
    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    role: "student" | "teacher" | "admin";

    @ManyToOne(type => Group, (group) => group.teacher)
    groups: GroupDTO | null;
}