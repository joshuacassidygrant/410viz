import axios from 'axios'

//REPO
// 'https://api.github.com/repos/octocat/Hello-World'

// CONTRIBUTORS
// "http://api.github.com/repos/octocat/Hello-World/contributors"

// FOLLOWING
// /users/:username/following/:target_user
const baseURL = 'https://api.github.com/' 

export function fetchRepo(owner: string, repo: string) {
  console.log('inside fetch repo')
  axios.get(baseURL + `/repos/${owner}/${repo}`)
    .then (res => {
      console.log("Repository")
      return res.data;
    })
}

export function fetchContributors(owner: string, repo: string) {
  console.log('inside fetch contributors')
  axios.get(baseURL + `/repos/${owner}/${repo}/contributors`)
  .then(res => {
    const contributors = res.data;
    console.log("Contributors", contributors)
  })
}

export function fetchFollowing() {
  console.log('inside fetch following')
}

function buildContributors() {
  
}