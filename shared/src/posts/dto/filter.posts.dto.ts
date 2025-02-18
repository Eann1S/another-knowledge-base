import { ApiProperty } from '@nestjs/swagger';

export class FilterPostsDto {
  @ApiProperty()
  tagNames?: string |string[];

  @ApiProperty()
  isPublic?: boolean;

  @ApiProperty()
  authorId?: number;
}
