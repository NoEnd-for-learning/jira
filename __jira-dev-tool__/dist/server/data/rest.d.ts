export const projectDB: Rest;
export const epicDB: Rest;
export const taskDB: Rest;
export const kanbanDB: Rest;
export const userDB: Rest;
export const taskTypeDB: Rest;
export const tagDB: Rest;
declare class Rest {
    constructor(storageKey: any);
    storageKey: string;
    list: any[];
    get listMap(): any;
    persist: () => void;
    load: () => any;
    validateItem: (id: any) => void;
    /**
     *
     * @param fromId
     * @param type 'after'|'before'
     * @param toId
     */
    reorder({ fromId, type, referenceId }: {
        fromId: any;
        type: any;
        referenceId: any;
    }): void;
    push(items: any): void;
    detail: (id: any) => any;
    remove: (id: any) => void;
    update(id: any, updates: any): any;
    create({ name, ...rest }: {
        [x: string]: any;
        name?: void | undefined;
    }): any;
    query(param: any): any;
    queryByOwnerId(userId: any, param: any): any;
}
export {};
