import { DirectusClient, rest, createDirectus, staticToken } from '@directus/sdk';

export let directusInstance:unknown

export function initDirectusInstance(url: string, token: string) {
    directusInstance = createDirectus(url).with(staticToken(token)).with(rest());
}