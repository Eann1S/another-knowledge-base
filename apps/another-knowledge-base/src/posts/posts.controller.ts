import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto, JwtPayload, FilterPostsDto, UpdatePostDto } from '@another-knowledge-base/shared';
import { Public } from '../auth/public.route';

@ApiTags('posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @HttpCode(201)
  @ApiCreatedResponse()
  @Post('')
  async create(
    @Body() dto: CreatePostDto,
    @Req() req: { payload: JwtPayload }
  ) {
    return this.postService.create(req.payload.sub, dto);
  }

  @HttpCode(200)
  @ApiOkResponse()
  @Get('')
  async findAll(@Query() filter: FilterPostsDto) {
    return this.postService.findAll(filter);
  }

  @HttpCode(200)
  @ApiOkResponse()
  @Get('public')
  @Public()
  async findAllPublic() {
    return this.postService.findAll({ isPublic: true });
  }

  @HttpCode(200)
  @ApiOkResponse()
  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.postService.findOneById(id);
  }

  @HttpCode(200)
  @ApiOkResponse()
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    return this.postService.update(id, dto);
  }

  @HttpCode(200)
  @ApiOkResponse()
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.postService.delete(id);
  }
}
