import { Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm"
import { ExperimentDTO, OtherItemDTO } from "../../../models";
import { Experiment } from "./Experiment";

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

    @ManyToMany(() => Experiment,  (experiment) => experiment.neededotheritems)
    experiments: ExperimentDTO[];
}