import axios from 'axios'
import _ from 'lodash'
import { User } from './User'
import { Repo } from './Repo'

const instance = axios.create({
    baseURL: 'https://api.github.com/users/',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        'User-Agent': 'request'
    }
});

class GithubApiService {

    async getUserInfo(userName: string) {

        const userResponse = await instance.get(`${userName}`)

        const repos = await this.getRepos(userName)
        const sortedRepos = _.sortBy(repos, (repo: Repo) => repo.size * -1)
        const filteredRepos = _.take(sortedRepos, 5)

        const user = new User(userResponse.data, filteredRepos)

        return user
    }

    async getRepos(userName: string) {

        const response = await instance.get(`${userName}/repos`)
        return response.data.map((repo: any) => new Repo(repo))
    }
}

export const githubApiService = new GithubApiService()