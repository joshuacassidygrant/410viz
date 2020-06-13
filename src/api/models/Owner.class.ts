interface RepositoryURLs {
  followers: string
  following: string
}

export default class Owner {
  id: number
  name: string
  url: string
  avatarUrl: string
  urls: RepositoryURLs

  constructor (
    id: number, 
    name: string, 
    url: string, 
    avatarUrl: string, 
    followers: string, 
    following: string
  ) {
    this.id = id
    this.name = name
    this.url = url
    this.avatarUrl = avatarUrl
    this.urls = {
      followers,
      following,
    }
  }
}