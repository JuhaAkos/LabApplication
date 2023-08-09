import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"
import { DeviceDTO } from "../../../models";

@Entity()
export class Device implements DeviceDTO{
    @PrimaryGeneratedColumn()
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