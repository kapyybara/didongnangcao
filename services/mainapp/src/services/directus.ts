import { auth, createDirectus, staticToken } from '@directus/sdk';

export function createDirectusInstance(url: string, token: string) {
    return createDirectus(url).with(staticToken(token));
}