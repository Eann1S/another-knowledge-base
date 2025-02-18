import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';
import { TagDto } from '../../tags/dto/tag.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PostDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty()
  author: UserDto;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  isPublic: boolean;

  @ApiProperty()
  tags: TagDto[];

  @ApiProperty()
  createdAt: Date;
}
