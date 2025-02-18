import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { CreateTagDto } from '../../tags/dto/create.tag.dto';
import { PostDto } from './post.dto';

export class CreatePostDto extends IntersectionType(
  PickType(PostDto, ['title', 'content'] as const),
  PartialType(PickType(PostDto, ['isPublic'] as const))
) {
  @ApiProperty()
  tags?: CreateTagDto[];
}
