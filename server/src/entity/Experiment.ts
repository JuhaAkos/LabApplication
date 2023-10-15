import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm"
import { ChemicalDTO, DeviceDTO, ExperimentDTO, GlassContainerDTO, MetalToolDTO, OtherItemDTO, WoodenToolDTO } from "../../../models";
import { Chemical } from "./Chemical";
import { WoodenTool } from "./WoodenTool";
import { MetalTool } from "./MetalTool";
import { GlassContainer } from "./GlassContainer";
import { Device } from "./Device";
import { OtherItem } from "./OtherItem";

@Entity()
export class Experiment implements ExperimentDTO{    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;    

    @Column("varchar", { length: 2000 })
    description: string;

    @ManyToMany(() => Chemical,  (chemical) => chemical.experiments, { eager: true })
    @JoinTable()
    neededchemicals: ChemicalDTO[];

    @ManyToMany(() => WoodenTool,  (woodentool) => woodentool.experiments, { eager: true })
    @JoinTable()
    neededwoodentools: WoodenToolDTO[];

    @ManyToMany(() => MetalTool,  (metaltool) => metaltool.experiments, { eager: true })
    @JoinTable()
    neededmetaltools: MetalToolDTO[];

    @ManyToMany(() => GlassContainer,  (glasscontainer) => glasscontainer.experiments, { eager: true })
    @JoinTable()
    neededglasscontainers: GlassContainerDTO[];

    @ManyToMany(() => Device,  (device) => device.experiments, { eager: true })
    @JoinTable()
    neededdevices: DeviceDTO[];

    @ManyToMany(() => OtherItem,  (otheritem) => otheritem.experiments, { eager: true })
    @JoinTable()
    neededotheritems: OtherItemDTO[];
}