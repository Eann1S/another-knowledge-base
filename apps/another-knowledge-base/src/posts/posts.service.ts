import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FindOptionsWhere, In, Or, Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDto } from './dto/post.dto';
import { mapPostToDto } from './dto/post.mapper';
import { CreatePostDto } from './dto/create.post.dto';
import { FilterPostsDto } from './dto/filter.posts.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { TagsService } from '../tags/tags.service';
import { isArray, isString } from 'class-validator';
import { Tag } from '../tags/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private tagsService: TagsService
  ) {}

  async create(authorId: number, dto: CreatePostDto): Promise<PostDto> {
    try {
      const tags = await this.tagsService.createMany(dto.tags);
      const { title, content, isPublic } = dto;
      const post = await this.postsRepository.save({
        title,
        content,
        isPublic,
        authorId,
        tags,
      });
      return mapPostToDto(post);
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException(`Something went wrong`);
    }
  }

  async findAll(filter: FilterPostsDto): Promise<PostDto[]> {
    try {
      const whereClause = this.buildWhereClause(filter);
      const posts = await this.postsRepository.find({
        relations: ['tags', 'author'],
        relationLoadStrategy: 'query',
        where: whereClause,
      });
      return posts.map(mapPostToDto);
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException(`Something went wrong`);
    }
  }

  private buildWhereClause(filter: FilterPostsDto) {
    const whereClause: FindOptionsWhere<Post> = {};
    const { tagNames, isPublic, authorId } = filter;

    if (tagNames && tagNames.length > 0) {
      whereClause.tags = {
        name: isString(tagNames) ? tagNames : In(tagNames),
      };
    }

    if (isPublic !== undefined) {
      whereClause.isPublic = isPublic;
    }

    if (authorId !== undefined) {
      whereClause.authorId = authorId;
    }

    return whereClause;
  }

  async findOneById(id: number): Promise<PostDto> {
    return await this.findOne({ id });
  }

  async update(id: number, dto: UpdatePostDto): Promise<PostDto> {
    const post = await this.findOne({ id });
    try {
      const { title, content, isPublic } = dto;
      post.title = title;
      post.content = content;
      post.isPublic = isPublic;
      await this.postsRepository.save(post);
      return mapPostToDto(post);
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException(`Something went wrong`);
    }
  }

  async delete(id: number) {
    try {
      await this.postsRepository.delete(id);
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException(`Something went wrong`);
    }
  }

  async findOne(
    where: FindOptionsWhere<Post> | FindOptionsWhere<Post>[]
  ): Promise<Post> {
    try {
      return await this.postsRepository.findOneByOrFail(where);
    } catch (e) {
      Logger.error(e);
      throw new NotFoundException(`Post not found`);
    }
  }
}
