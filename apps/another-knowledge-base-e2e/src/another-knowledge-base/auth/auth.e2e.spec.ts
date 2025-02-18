import { generateAuthDto, loginUser } from './auth.e2e.utils';

import { registerUser, createRandomUser } from './auth.e2e.utils';

describe('Auth e2e tests', () => {
  describe('User Registration', () => {
    it('should register a new user successfully', async () => {
      const dto = generateAuthDto();

      const res = await registerUser(dto);

      expect(res.status).toBe(201);
      expect(res.data.email).toBe(dto.email);
      expect(res.data.createdAt).toBeDefined();
      expect(res.data.id).toBeDefined();
    });

    it('should fail registration with invalid email', async () => {
      const dto = generateAuthDto();

      const res = await registerUser({ ...dto, email: 'invalid-email' });

      expect(res.data).toMatchObject({
        statusCode: 400,
        message: ['email must be an email'],
      });
    });

    it('should fail registration when user already exists', async () => {
      const user = await createRandomUser();

      const res = await registerUser({
        email: user.user.email,
        password: 'password',
      });

      expect(res.data).toMatchObject({
        statusCode: 409,
        message: `User with email ${user.user.email} already exists`,
      });
    });

    describe('User Login', () => {
      it('should login successfully with valid credentials', async () => {
        const { user } = await createRandomUser();

        const res = await loginUser({
          email: user.email,
          password: user.password,
        });

        expect(res.status).toBe(200);
        expect(res.data.accessToken).toBeDefined();
      });

      it('should fail login with incorrect password', async () => {
        const { user } = await createRandomUser();

        const res = await loginUser({
          email: user.email,
          password: 'incorrect-password',
        });

        expect(res.data).toMatchObject({
          statusCode: 401,
          message: 'Password is incorrect',
        });
      });

      it('should fail login with non-existent email', async () => {
        const res = await loginUser({
          email: 'non-existent-email@gmail.com',
          password: 'password',
        });

        expect(res.data).toMatchObject({
          statusCode: 404,
          message: 'User not found',
        });
      });
    });
  });
});
