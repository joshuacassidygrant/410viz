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
    console.log("Error", e)
    return undefined
  }
}

export async function fetchContributors(owner: string, repo: string): Promise<any[]|undefined> {
  var user = process.env.REACT_APP_USERNAME!
  var pass = process.env.REACT_APP_PASSWORD!
  console.log("inside fetchContributors")
  console.log("args", owner, repo)

  try {
    return await axios.get(`/repos/${owner}/${repo}/contributors`, {
      auth: {
        username: user,
        password: pass
      }
    })
    .then(res => {
      console.log("Contributors", res.data)
      return res.data
    })
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export async function fetchFollowing(follower: string, followee: string): Promise<boolean|undefined> {
  var user = process.env.REACT_APP_USERNAME!
  var pass = process.env.REACT_APP_PASSWORD!
  try {
    axios.get(`/users/${follower}/following/${followee}`, {
      auth: {
        username: user,
        password: pass
      }
    })
    .then(() => {
      return true;
    })
  } catch (e) {
    console.error("Error at fetchFollowing: ", e)
    return undefined
  }
}