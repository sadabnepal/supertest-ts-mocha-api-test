export type UserPayloadType = {
    name: string,
    job: string
}

export type UserResponseType = UserPayloadType & {
    id: string,
    createdAt: string
}