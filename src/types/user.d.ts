export interface UserPayloadType {
    name: string,
    job: string
}

export type UserResponseType = UserPayloadType & {
    id: string,
    createdAt: string
}

export interface Employee {
    name: string,
    empId: number,
    role: string,
    company: string
}

export interface Person {
    id: number,
    name: string,
    email: string,
    gender: string,
    status: string
}