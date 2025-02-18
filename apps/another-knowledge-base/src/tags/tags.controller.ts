import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';

@ApiTags('tags')
@ApiBearerAuth()
@Controller('tags')
export class TagsController {
    constructor (private tagsService: TagsService) {}

    @Get('')
    @HttpCode(200)
    @ApiOkResponse()
    async findAll() {
        return this.tagsService.findAll();
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiOkResponse()
    async delete(@Param('id') id: number) {
        return this.tagsService.delete(id);
    }
}
