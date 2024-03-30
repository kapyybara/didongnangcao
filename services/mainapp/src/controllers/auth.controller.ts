import { createItem } from '@directus/sdk';
import { directusInstance } from '../services/directus';
import { register } from '../services/oauth';
import { getUserByEmail } from './user.controller';

export const createAppUser= async (
  email: string,
  password: string,
  username: string,
) => {
  await register(email, password);
  await directusInstance.request(
    createItem('app_user', {
      email: email,
      full_name: username,
    }),
  );
};
