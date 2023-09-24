import "reflect-metadata"
import { DataSource } from "typeorm"
import { Chemical } from "./entity/Chemical"
import { Device } from "./entity/Device"
import { WoodenTool } from "./entity/WoodenTool"
import { MetalTool } from "./entity/MetalTool"
import { OtherItem } from "./entity/OtherItem"
import { GlassContainer } from "./entity/GlassContainer"
import { Group } from "./entity/Group"
import { User } from "./entity/User"
import { Calendar } from "./entity/Calendar"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "labapp",
    synchronize: true,
    logging: true,
    entities: [Chemical, Device, WoodenTool, MetalTool, OtherItem, GlassContainer, Group, User, Calendar],
    migrations: [],
    subscribers: [],
    timezone: "+02:00",
})
