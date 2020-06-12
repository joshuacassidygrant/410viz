import axios from 'axios'

// REPO 'https://api.github.com/repos/octocat/Hello-World'
// CONTRIBUTORS "http://api.github.com/repos/octocat/Hello-World/contributors"
// FOLLOWING http://api.github.com/users/:username/following/:target_user

const baseURL = 'https://api.github.com/' 

export async function fetchRepo(owner: string, repo: string) {
  try {
    axios.get(baseURL + `/repos/${owner}/${repo}`)
    .then (res => {
      console.log("Repository")
      return res.data;
    })
  } catch (e) {
    console.error(e)
  }
}

export async function fetchContributors(owner: string, repo: string) {
  try {
    axios.get(baseURL + `/repos/${owner}/${repo}/contributors`)
    .then(res => {
      const contributors = res.data;
      console.log("Contributors", contributors)
    })
  } catch (e) {
    console.error(e)
  }
}

export async function fetchFollowing(follower: string, followee: string) {
  try {
    axios.get(baseURL +`/users/${follower}/following/${followee}`)
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

