import { Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm"
import { DeviceDTO, ExperimentDTO } from "../../../models";
import { Experiment } from "./Experiment";

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

    @ManyToMany(() => Experiment,  (experiment) => experiment.neededdevices)
    experiments: ExperimentDTO[];
}