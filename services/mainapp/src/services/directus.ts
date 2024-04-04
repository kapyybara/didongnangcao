import {
  DirectusClient,
  RestClient,
  StaticTokenClient,
  createDirectus,
  rest,
  staticToken,
} from '@directus/sdk'

type DirectusInstanceType = DirectusClient<any> &
  StaticTokenClient<any> &
  RestClient<any>

export let directusInstance: DirectusInstanceType

export function initDirectusInstance(url: string, token: string) {
  directusInstance = createDirectus(url).with(staticToken(token)).with(rest())
}
