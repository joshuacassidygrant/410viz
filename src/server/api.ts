import axios from 'axios'

// REPO 'https://api.github.com/repos/octocat/Hello-World'
// CONTRIBUTORS "http://api.github.com/repos/octocat/Hello-World/contributors"
// FOLLOWING http://api.github.com/users/:username/following/:target_user

const baseURL = 'https://api.github.com/' 

export async function fetchRepo(owner: string, repo: string) {
  axios.get(baseURL + `/repos/${owner}/${repo}`)
    .then (res => {
      console.log("Repository")
      return res.data;
    })
}

export async function fetchContributors(owner: string, repo: string) {
  axios.get(baseURL + `/repos/${owner}/${repo}/contributors`)
  .then(res => {
    const contributors = res.data;
    console.log("Contributors", contributors)
  })
}

export async function fetchFollowing(follower: string, followee: string) {
  axios.get(baseURL +`/users/${follower}/following/${followee}`)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    })
}

