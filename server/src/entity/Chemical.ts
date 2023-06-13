import { Entity, Column, PrimaryColumn} from "typeorm"
import { ChemicalDTO } from "../../../models";

@Entity()
export class Chemical implements ChemicalDTO{
    @PrimaryColumn()
    id: number;

    @Column()
    officialname: string;

    @Column()
    commonname: string;

    @Column()
    amount: number;

    @Column()
    unit: string;

    @Column()
    poisonouseffect: null | string;

    @Column()
    storage: string;

    @Column()
    expiration: Date;

    @Column()
    description: string;
}