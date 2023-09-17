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