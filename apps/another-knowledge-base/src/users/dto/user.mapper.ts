import { User } from "../user.entity";
import { UserDto } from "./user.dto";

export function mapUserToDto(user: User): UserDto {
    return {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
    }
}