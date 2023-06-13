import { Entity, Column, PrimaryColumn} from "typeorm"
import { OtherItemDTO } from "../../../models";

@Entity()
export class OtherItem implements OtherItemDTO{
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;    

    @Column()
    amount: number;

    @Column()
    description: string;
}