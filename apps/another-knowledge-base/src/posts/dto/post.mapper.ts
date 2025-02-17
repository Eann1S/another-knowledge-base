import { mapTagToDto } from '../../tags/dto/tags.mapper';
import { mapUserToDto } from '../../users/dto/user.mapper';
import { Post } from '../post.entity';
import { PostDto } from './post.dto';

export function mapPostToDto(post: Post): PostDto {
  if (!post) {
    return null;
  }
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    authorId: post.authorId,
    author: mapUserToDto(post.author),
    isPublic: post.isPublic,
    tags: post.tags?.map(mapTagToDto),
    createdAt: post.createdAt,
  };
}
