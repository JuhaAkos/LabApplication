import { Entity, Column, PrimaryColumn} from "typeorm"
import { GlassContainerDTO } from "../../../models";

@Entity()
export class GlassContainer implements GlassContainerDTO{
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;    

    @Column()
    capacity: number;

    @Column()
    amount: number;

    @Column()
    description: string;
}