import { Param } from 'screens/project-list/search-panel';

export interface Project extends Param {
    // name: string,
    // personId: number,
    id: number,
    pin: boolean,
    organization: string,
    created: number,
}