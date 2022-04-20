import { StringLike } from "@firebase/util"

export type PublicProjectData = {
  date?: string,
  imageFile?: string,
  description: string,
  title: string,
  url: string
}

export type PublicProjectsData = {
  [key: string]: PublicProjectData
}

export type PublicLinksData = {
  instagram: string,
  youtube: string,
  mail: string
}


export type InstagramPostData = {
  media_url: string,
  caption: string,
  permalink: string,
  id: string  
}

export type InstagramProfileData = {
  username: string,
  media_count: number
}

export type GithubProfileData = {
  login: string, // basically the username
  html_url: string
  company: string,
  bio: string,
  public_repos: number
}

export type GithubRepoData = {
  name: string,
  html_url: string,
  description: string,
  language: string,
  updated_at: string
}