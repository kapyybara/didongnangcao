import { DirectusClient, auth, createDirectus, staticToken } from '@directus/sdk';

export let directusInstance:DirectusClient<any>

export function initDirectusInstance(url: string, token: string) {
    directusInstance = createDirectus(url).with(staticToken(token));
}