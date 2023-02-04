import crypto from 'crypto'

function getEmailHash(emailAddress: string): string {
  return crypto
    .createHash("md5")
    .update(emailAddress)
    .digest("hex");
}

export function generateAvatarUrl(emailAddress: string, options: { defaultImage?: string } = {}): string {
  const defaultImage = options.defaultImage || "identicon";
  const emailHash = getEmailHash(emailAddress)
  return `https://www.gravatar.com/avatar/${emailHash}?d=${defaultImage}`;
}

export interface GravatarProfileType {
  id: string
  hash: string
  requestHash: string
  profileUrl: string
  preferredUsername: string
  thumbnailUrl: string
  photos: {
    value: string
    type: string
  }[]
  name: {
    givenName: string
    familyName: string
    formatted: string
  }
  displayName: string
  aboutMe?: string
  urls: string[]
}

export async function getGravatarProfile(emailAddress: string): Promise<GravatarProfileType | undefined> {
  const emailHash = getEmailHash(emailAddress)
  const res = await fetch(`https://www.gravatar.com/${emailHash}.json`)
  const profileResponse = await res.json() as {
    entry?: GravatarProfileType[]
  }
  return profileResponse?.entry ? profileResponse?.entry[0] : undefined
}

export async function getInternalGravatarProfile(emailAddress: string): Promise<GravatarProfileType | undefined> {
  const response = await fetch(`/api/gravatar/${encodeURIComponent(emailAddress)}`)
  const json = await response.json()
  if ("status" in json || json.status === 404) return undefined
  return json as GravatarProfileType
}

