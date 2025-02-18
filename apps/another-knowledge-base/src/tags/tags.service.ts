import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '@another-knowledge-base/shared';
import { CreateTagDto, mapTagToDto } from '@another-knowledge-base/shared';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagsRepository: Repository<Tag>) {}

  async createMany(dtos: CreateTagDto[]) {
    try {
      const tags = dtos.map(({ name }) => this.tagsRepository.create({ name }));
      return await this.tagsRepository.save(tags);
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException(`Something went wrong`);
    }
  }

  async findAll() {
    try {
      const tags = await this.tagsRepository.find();
      return tags.map(mapTagToDto);
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException(`Something went wrong`);
    }
  }

  async delete(id: number) {
    try {
      await this.tagsRepository.delete(id);
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException(`Something went wrong`);
    }
  }
}
