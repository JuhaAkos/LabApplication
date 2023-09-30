export interface ChemicalDTO {
    id: number;
    officialname: string;
    commonname: string;
    amount: number;
    unit: string;
    poisonouseffect: null | string;
    storage: string;
    expiration: Date;
    description: string;
}

export interface WoodenToolDTO {
    id: number;
    name: string;
    amount: number;
    description: string;
}

export interface MetalToolDTO {
    id: number;
    name: string;
    amount: number;
    description: string;
}

export interface GlassContainerDTO {
    id: number;
    name: string;
    capacity: number;
    unit: string;
    amount: number;
    description: string;
}

export interface DeviceDTO {
    id: number;
    name: string;
    amount: number;
    fieldofuse: string;
    description: string;
}

export interface OtherItemDTO {
    id: number;
    name: string;
    amount: number;
    description: string;
}

export interface CalendarDTO {
    id: number;
    week: 1 | 2 | 3;
    day: 1 | 2 | 3 | 4 | 5;
    timeofclass: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    activity: string;
    //alcsoport kiírás szokott lenni , az mehet ide
    description: string;
    //szétválasztható fiz és kémia részre megnevezés alapján
    //vagy hagyható egybe -> fulllab
    classroom: "teljes labor" | "kémia labor" | "fizika labor";
    groups: GroupDTO[];
    secondaryclass: 0 | 1;
    istimetableclass: boolean;
}

export interface GroupDTO {
    id: number;
    name: string;
    teacher: UserDTO;
    studentnames: string[];
    classes: CalendarDTO[];
}

export interface UserDTO {
    id: number;
    name: string;
    password: string;
    schoolid: string;
    role: "student" | "teacher" | "admin"; 
    groups: null | GroupDTO[];
}