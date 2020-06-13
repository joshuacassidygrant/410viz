import axios from 'axios'

export async function fetchRepo(owner: string, repo: string): Promise<any|undefined> {
  var user = process.env.REACT_APP_USERNAME!
  var pass = process.env.REACT_APP_PASSWORD!

  try {
    return await axios.get(`/repos/${owner}/${repo}`, {
      auth: {
        username: user,
        password: pass
      }
    })
    .then(res => {
      return res.data
    })
  }
  catch (e) {
    console.error("Error at fetchRepo", e)
    return undefined
  }
}

export async function fetchContributors(owner: string, repo: string): Promise<any[]|undefined> {
  var user = process.env.REACT_APP_USERNAME!
  var pass = process.env.REACT_APP_PASSWORD!

  try {
    return await axios.get(`/repos/${owner}/${repo}/contributors`, {
      auth: {
        username: user,
        password: pass
      }
    })
    .then(res => {
      return res.data
    })
  } catch (e) {
    console.error("Error at fetchContributors", e)
    return undefined
  }
}

export async function fetchFollowingList(username: string) {
  var user = process.env.REACT_APP_USERNAME!
  var pass = process.env.REACT_APP_PASSWORD! 
  try {
    return axios.get(`/users/${username}/following`, {
      auth: {
        username: user,
        password: pass
      }
    })
    .then((res) => {
      console.log('success fetch following')
      console.log('following DATA for ' + username)
      return res.data;
    })
  } catch (e) {
    console.error("Error at fetchFollowingList", e)
    return undefined
  }
}

export async function fetchFollowing(follower: string, followee: string): Promise<boolean|undefined> {
  var user = process.env.REACT_APP_USERNAME!
  var pass = process.env.REACT_APP_PASSWORD!
  try {
    return axios.get(`/users/${follower}/following/${followee}`, {
      auth: {
        username: user,
        password: pass
      }
    })
    .then(() => {
      return true;
    })
  } catch (e) {
    return undefined
  }
}