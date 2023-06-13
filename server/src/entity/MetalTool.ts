import { Entity, Column, PrimaryColumn} from "typeorm"
import { MetalToolDTO } from "../../../models";

@Entity()
export class MetalTool implements MetalToolDTO{
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;    

    @Column()
    amount: number;

    @Column()
    description: string;
}