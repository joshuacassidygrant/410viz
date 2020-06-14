import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import JSONRepository from "./models/JSONRepository.class"
// https://medium.com/@enetoOlveda/how-to-use-axios-typescript-like-a-pro-7c882f71e34a

export const angularURL = "angular/angular"
export const reactURL = "facebook/react"
export const vueURL = "vuejs/vue"

const githubAPI = axios.create ({
  headers: {
    "Accept": "application/vnd.github.v3+json"
  },
  baseURL: "https://api.github.com",
  timeout: 1000
})

export async function testRoute (): Promise<void> {
  try {
    console.log ("beginning fetch...")
    const res = await githubAPI.get ("/")
    console.log ("resource fetced: ", res)
  }
  catch (error) {
    console.error("could not fetch. ", error)
  }
}

export async function fetchRepository (repo: string): Promise<void> {
  try {
    console.log ("beginning fetch...")
    const res = await githubAPI.get (`/repos/${repo}`)
    console.log ("resource fetched")
    // console.log(res.data)
    
    const jsonRepo = new JSONRepository (res.data)
    jsonRepo.extractRepositoryData ()
    console.log ("created repository class: ", jsonRepo.repository)
    console.log ("created owner class: ", jsonRepo.owner)
  }
  catch (error) {
    console.error("could not fetch. ", error)
  }
}
