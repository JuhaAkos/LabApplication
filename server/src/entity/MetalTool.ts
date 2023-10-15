import { Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm"
import { ExperimentDTO, MetalToolDTO } from "../../../models";
import { Experiment } from "./Experiment";

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

    @ManyToMany(() => Experiment,  (experiment) => experiment.neededdevices)
    experiments: ExperimentDTO[];
}