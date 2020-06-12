import axios from 'axios'

export function fetchRepo() {
  console.log('inside fetch repo')
}

export function fetchContributors(user: string, repo: string) {
  console.log('inside fetch contributors')
  axios.get('https://api.github.com/repos/twbs/bootstrap/contributors')
}

export function fetchFollowing() {
  console.log('inside fetch following')
}