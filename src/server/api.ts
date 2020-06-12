import axios from 'axios'

const baseURL = 'https://api.github.com/' 

export async function fetchRepo(owner: string, repo: string) {
  var user = process.env.REACT_APP_USER!
  var pass = process.env.REACT_APP_PASS!
  console.log("HERE:", user, pass)
  try {
    axios.get(baseURL + `/repos/${owner}/${repo}`, {
      auth: {
        username: user,
        password: pass
      }
    })
    .then (res => {
      console.log("Repository")
      return res.data;
    })
  } catch (e) {
    console.error(e)
  }
}

export async function fetchContributors(owner: string, repo: string) {
  var user = process.env.REACT_APP_USER!
  var pass = process.env.REACT_APP_PASS!
  try {
    axios.get(baseURL + `/repos/${owner}/${repo}/contributors`, {
      auth: {
        username: user,
        password: pass
      }
    })
    .then(res => {
      const contributors = res.data;
      console.log("Contributors", contributors)
    })
  } catch (e) {
    console.error(e)
  }
}

export async function fetchFollowing(follower: string, followee: string) {
  var user = process.env.REACT_APP_USER!
  var pass = process.env.REACT_APP_PASS!
  try {
    axios.get(baseURL +`/users/${follower}/following/${followee}`, {
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

