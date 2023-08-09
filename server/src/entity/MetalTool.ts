import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"
import { MetalToolDTO } from "../../../models";

@Entity()
export class MetalTool implements MetalToolDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;    

    @Column()
    amount: number;

    @Column()
    description: string;
}