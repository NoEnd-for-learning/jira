export interface User {
    id: number,
    name: string,
    title: string,
    email: string,
    organization: string,
    passwordHash: string,
    token: string,
}