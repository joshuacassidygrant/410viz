import axios from 'axios'

function fetchRepository() {
  console.log('inside fetch repo')
}

function fetchContributors(user: string, repo: string) {
  console.log('inside fetch contributors')
  axios.get('https://api.github.com/repos/twbs/bootstrap/contributors')
}

function fetchFollowing() {
  console.log('inside fetch following')
}