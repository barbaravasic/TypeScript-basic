import {GithubApiService} from './GithubApiService'
import _ from 'lodash'
import { User } from './User'
import { Repo } from './Repo'

let svc = new GithubApiService()

svc.getUserInfo('barbaravasic', (user: User) => {

    svc.getRepos('barbaravasic', (repos: Repo[]) => {
        let sortedRepos = _.sortBy(repos, (repo: Repo) => repo.size * -1)
        let filteredRepos = _.take(sortedRepos, 5)
        user.repos = filteredRepos
        console.log(user)
    })
})

