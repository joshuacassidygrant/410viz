import axios from 'axios'

export async function fetchRepo(owner: string, repo: string): Promise<any|undefined> {
  var user = process.env.REACT_AP_USERNAME!
  var pass = process.env.REACT_APP_PASSWORD!

  try {
    await axios.get(`/repos/${owner}/${repo}`, {
      auth: {
        username: user,
        password: pass
      }
    })
    .then(res => {
      console.log("RESULT", res)
      return res.data
    })
  }
  catch (e) {
    console.log("Error", e)
    return undefined
  }

}

export async function fetchContributors(owner: string, repo: string): Promise<any[]|undefined> {
  var user = process.env.REACT_APP_USER!
  var pass = process.env.REACT_APP_PASS!
  try {
    axios.get(`/repos/${owner}/${repo}/contributors`, {
      auth: {
        username: user,
        password: pass
      }
    })
    .then(res => {
      const contributors: any[] = res.data;
      console.log("Contributors", contributors)
      return contributors
    })
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export async function fetchFollowing(follower: string, followee: string) {
  var user = process.env.REACT_APP_USER!
  var pass = process.env.REACT_APP_PASS!
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
    .catch(() => {
      return false;
    })
  } catch (e) {
    console.error(e)
  }
}