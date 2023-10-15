import { Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm"
import { ExperimentDTO, GlassContainerDTO } from "../../../models";
import { Experiment } from "./Experiment";

@Entity()
export class GlassContainer implements GlassContainerDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;    

    @Column()
    capacity: number;

    @Column()
    unit: string;

    @Column()
    amount: number;

    @Column()
    description: string;

    @ManyToMany(() => Experiment,  (experiment) => experiment.neededglasscontainers)
    experiments: ExperimentDTO[];
}