import axios from 'axios';
import { AuthDto, UserDto } from '@another-knowledge-base/shared';
import { faker } from '@faker-js/faker';

export const registerUser = async (dto: AuthDto) => {
  return axios.post<UserDto>('/auth/register', dto);
};

export const loginUser = async (dto: AuthDto) => {
  return axios.post<{ accessToken: string }>('/auth/login', dto);
};

export const createRandomUser = async () => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  const { data: user } = await registerUser({
    email,
    password,
  });
  const { data: login } = await loginUser({
    email,
    password,
  });

  return {
    user: { ...user, password },
    accessToken: login.accessToken,
  };
};

export const generateAuthDto = (): AuthDto => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
