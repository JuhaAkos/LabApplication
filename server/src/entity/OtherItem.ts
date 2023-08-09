import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"
import { OtherItemDTO } from "../../../models";

@Entity()
export class OtherItem implements OtherItemDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;    

    @Column()
    amount: number;

    @Column()
    description: string;
}