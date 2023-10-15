import { Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm"
import { ChemicalDTO, ExperimentDTO } from "../../../models";
import { Experiment } from "./Experiment";

@Entity()
export class Chemical implements ChemicalDTO{
    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    officialname: string;

    @Column()
    name: string;

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

    @ManyToMany(() => Experiment,  (experiment) => experiment.neededchemicals)
    experiments: ExperimentDTO[];
}