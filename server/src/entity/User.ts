import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import { GroupDTO, UserDTO } from "../../../models";
import { Group } from "./Group";

@Entity()
export class User implements UserDTO{
    @PrimaryGeneratedColumn()    
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ select: false })
    password: string;

    @Column()
    role: "student" | "teacher" | "admin";

    @OneToMany(type => Group, (group) => group.teacher, { eager: true })
    groups: GroupDTO[] | null;
}