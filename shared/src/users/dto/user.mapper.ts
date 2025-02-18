import { User } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';

export function mapUserToDto(user: User): UserDto {
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  };
}
