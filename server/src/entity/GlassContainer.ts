import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"
import { GlassContainerDTO } from "../../../models";

@Entity()
export class GlassContainer implements GlassContainerDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;    

    @Column()
    capacity: number;

    @Column()
    unit: string;

    @Column()
    amount: number;

    @Column()
    description: string;
}