import { Entity, Column, PrimaryColumn} from "typeorm"
import { WoodenToolDTO } from "../../../models";

@Entity()
export class WoodenTool implements WoodenToolDTO{
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;    

    @Column()
    amount: number;

    @Column()
    description: string;
}