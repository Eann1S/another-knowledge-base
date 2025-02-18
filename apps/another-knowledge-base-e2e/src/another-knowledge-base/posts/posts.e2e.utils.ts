import axios from 'axios';
import { CreatePostDto, PostDto, UpdatePostDto } from '@another-knowledge-base/shared';
import { faker } from '@faker-js/faker';

export const createPost = async (dto: CreatePostDto, token: string) => {
  return axios.post<PostDto>('/posts', dto, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createRandomPost = async (token: string, overrideDto?: Partial<CreatePostDto>) => {
  const dto = generateCreatePostDto(overrideDto);
  const res = await createPost(dto, token);
  return res.data;
};

export const updatePost = async (id: number, dto: UpdatePostDto, token: string) => {
  return axios.put<PostDto>(`/posts/${id}`, dto, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deletePost = async (id: string, token: string) => {
  return axios.delete<void>(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getPost = async (id: number, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get<PostDto>(`/posts/${id}`, { headers });
};

export const getPosts = async (token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  return axios.get<PostDto[]>('/posts', { headers });
};

export const getPublicPosts = async () => {
  return axios.get<PostDto[]>('/posts/public');
};

export const generateCreatePostDto = (overrideDto?: Partial<CreatePostDto>): CreatePostDto => {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    isPublic: faker.datatype.boolean(),
    ...overrideDto,
  };
};

export const generateUpdatePostDto = (overrideDto?: Partial<UpdatePostDto>): UpdatePostDto => {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    isPublic: faker.datatype.boolean(),
    ...overrideDto,
  };
};
