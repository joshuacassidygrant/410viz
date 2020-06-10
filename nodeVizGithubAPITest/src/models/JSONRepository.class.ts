import Repository from "./Repository.class"
import Owner from "./Owner.class"
import { AxiosResponse } from "axios"

type APIData = AxiosResponse["data"]

export default class JSONRepository {
  data: APIData
  repository?: Repository
  owner?: Owner

  constructor (data: APIData) {
    this.data = data
  }

  private extractRepositoryDetails () {
    const { id, name, description, url, collaborators_url: collaborators } = this.data
    return new Repository (id, name, description, url, collaborators)
  }
  
  private extractOwnerDetails () {
    const { owner } = this.data
    const { 
      login: name, 
      id, url,
      avatar_url: avatar, 
      followers_url: followers, 
      following_url: following
    } = owner 
    return new Owner (id, name, url, avatar, followers, following)
  }
  
  public extractRepositoryData (): boolean {
    this.repository = this.extractRepositoryDetails ()
    this.owner = this.extractOwnerDetails ()
    return true
  }
}