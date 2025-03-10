import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Post, Tag } from '@another-knowledge-base/shared';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Post, Tag],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
