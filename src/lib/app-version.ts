export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? '0.1.0'

export type VersionPayload = {
  version: string
}

export function parseVersionPayload(value: unknown): VersionPayload | null {
  if (!value || typeof value !== 'object' || !('version' in value)) return null

  const version = value.version
  return typeof version === 'string' && version.length > 0 ? { version } : null
}
