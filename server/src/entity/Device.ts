import { Entity, Column, PrimaryColumn} from "typeorm"
import { DeviceDTO } from "../../../models";

@Entity()
export class Device implements DeviceDTO{
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;    

    @Column()
    amount: number;

    @Column()
    fieldofuse: string;   

    @Column()
    description: string;
}