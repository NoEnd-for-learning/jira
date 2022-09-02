export const taskTypes: {
    name: string;
}[];
export const tags: {
    name: string;
}[];
export const epics: {
    name: string;
    start: number;
    end: number;
}[];
export const kanbans: {
    name: string;
}[];
export const users: {
    name: string;
    organization: string;
}[];
export const projects: ({
    name: string;
    personId: number;
    organization: string;
    created: number;
    pin?: undefined;
} | {
    name: string;
    personId: number;
    organization: string;
    created: number;
    pin: boolean;
})[];
export const tasks: {
    name: string;
    tags: number[];
    reporterId: number;
    processorId: number;
    epicId: number;
    kanbanId: number;
    favorite: boolean;
    typeId: number;
    note: string;
}[];
