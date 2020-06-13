// https://developer.github.com/v3/repos/#get-a-repository

interface RepositoryURLs {
  collaborators: string
}

export default class Repository {
  id: number
  name: string
  description: string
  url: string
  urls: RepositoryURLs

  constructor (
    id: number,
    name: string,
    description: string,
    url: string,
    collaborators: string
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.url = url
    this.urls = {
      collaborators
    }
  }
}