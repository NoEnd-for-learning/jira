export function authenticate({ name, password }: {
    name: any;
    password: any;
}): any;
export function create({ name, password }: {
    name: any;
    password: any;
}): Promise<any>;
export function read(id: any): Promise<any>;
export function update(id: any, updates: any): Promise<any>;
export function remove(id: any): Promise<void>;
export function reset(): Promise<void>;
