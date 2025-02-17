import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { TagDto } from '../../tags/dto/tag.dto';

export class PostDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  author: UserDto;

  @ApiProperty({ default: false })
  isPublic: boolean;

  @ApiProperty()
  tags: TagDto[];

  @ApiProperty()
  createdAt: Date;
}
