import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"
import { WoodenToolDTO } from "../../../models";

@Entity()
export class WoodenTool implements WoodenToolDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;    

    @Column()
    amount: number;

    @Column()
    description: string;
}