import { Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm"
import { WoodenToolDTO } from "../../../models";
import { Experiment } from "./Experiment";

@Entity()
export class WoodenTool implements WoodenToolDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;    

    @Column()
    amount: number;

    @Column()
    description: string

    @ManyToMany(() => Experiment,  (experiment) => experiment.neededdevices)
    experiments: Experiment[];
}