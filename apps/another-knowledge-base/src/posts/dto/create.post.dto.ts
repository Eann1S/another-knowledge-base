import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PostDto } from './post.dto';
import { CreateTagDto } from '../../tags/dto/create.tag.dto';

export class CreatePostDto extends IntersectionType(
  PickType(PostDto, ['title', 'content'] as const),
  PartialType(PickType(PostDto, ['isPublic'] as const))
) {
  @ApiProperty()
  tags?: CreateTagDto[];
}
