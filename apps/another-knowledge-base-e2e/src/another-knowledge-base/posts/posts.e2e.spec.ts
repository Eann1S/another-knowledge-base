import { createRandomUser } from '../auth/auth.e2e.utils';
import {
  createPost,
  createRandomPost,
  deletePost,
  generateCreatePostDto,
  generateUpdatePostDto,
  getPost,
  getPosts,
  getPublicPosts,
  updatePost,
} from './posts.e2e.utils';

describe('Posts e2e tests', () => {
  describe('Create Post', () => {
    it('should create a new post successfully', async () => {
      const { user, accessToken } = await createRandomUser();
      const dto = generateCreatePostDto();

      const res = await createPost(dto, accessToken);

      expect(res.status).toBe(201);
      expect(res.data).toMatchObject({
        id: expect.any(Number),
        title: dto.title,
        content: dto.content,
        isPublic: dto.isPublic,
        authorId: user.id,
        createdAt: expect.any(String),
      });
    });

    it('should fail creating a post with invalid data', async () => {
      const { accessToken } = await createRandomUser();
      const dto = generateCreatePostDto();
      dto.title = '';
      dto.content = '';
      dto.isPublic = false;

      const res = await createPost(dto, accessToken);

      expect(res.status).toBe(400);
    });

    it('should create a post with tags successfully', async () => {
      const { accessToken } = await createRandomUser();
      const dto = generateCreatePostDto({ tags: [{ name: 'tag1' }, { name: 'tag2' }] });

      const res = await createPost(dto, accessToken);

      expect(res.status).toBe(201);
      expect(res.data).toMatchObject({
        id: expect.any(Number),
        title: dto.title,
        content: dto.content,
        isPublic: dto.isPublic,
        createdAt: expect.any(String),
        tags: expect.arrayContaining(dto.tags.map((tag) => ({
          id: expect.any(Number),
          name: tag.name,
        }))),
      });
    });
  });

  describe('Edit Post', () => {
    it('should edit an existing post successfully', async () => {
      const { accessToken } = await createRandomUser();
      const post = await createRandomPost(accessToken);
      const updateDto = generateUpdatePostDto();

      const res = await updatePost(post.id, updateDto, accessToken);

      expect(res.status).toBe(200);
      expect(res.data).toMatchObject({
        id: post.id,
        title: updateDto.title,
        content: updateDto.content,
        isPublic: updateDto.isPublic,
        authorId: post.authorId,
        createdAt: expect.any(String),
      });
    });
  });

  describe('Delete Post', () => {
    it('should delete a post successfully', async () => {
      const { accessToken } = await createRandomUser();
      const post = await createRandomPost(accessToken);

      const res = await deletePost(post.id.toString(), accessToken);

      expect(res.status).toBe(200);
    });
  });

  describe('Get Posts', () => {
    it('should retrieve all posts successfully', async () => {
      const { accessToken } = await createRandomUser();
      await createRandomPost(accessToken);
      await createRandomPost(accessToken);

      const res = await getPosts(accessToken);

      expect(res.status).toBe(200);
      expect(res.data).toBeInstanceOf(Array);
      expect(res.data.length).toBeGreaterThan(0);
    });

    it('should retrieve a single post successfully', async () => {
      const { accessToken } = await createRandomUser();
      const post = await createRandomPost(accessToken);

      const res = await getPost(post.id, accessToken);

      expect(res.status).toBe(200);
      expect(res.data).toMatchObject({
        id: post.id,
        title: post.title,
        content: post.content,
        isPublic: post.isPublic,
        authorId: post.authorId,
        createdAt: expect.any(String),
      });
    });

    it('should fail retrieving a post that does not exist', async () => {
      const { accessToken } = await createRandomUser();
      const res = await getPost(999999, accessToken);

      expect(res.status).toBe(404);
    });

    it('should retrieve public posts when user is not authenticated', async () => {
      const { accessToken } = await createRandomUser();
      await createRandomPost(accessToken, { isPublic: true });

      const res = await getPublicPosts();

      expect(res.status).toBe(200);
      expect(res.data).toBeInstanceOf(Array);
      expect(res.data.length).toBeGreaterThan(0);
    });
  });
});
