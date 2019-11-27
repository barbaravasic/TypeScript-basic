import axios from 'axios'
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

export class GithubApiService {

    getUserInfo(userName: string, cb: (user: User) => any) {

        return instance.get(`${userName}`)
        .then((response:any) => {
            const user = new User(response.data)
            cb(user)
        })

    }

    getRepos(userName: string, cb: (repos: Repo[]) => any) {

        return instance.get(`${userName}/repos`)
        .then((response:any) => {
            let repoArray = response.data.map((repo: any) => new Repo(repo))
            cb(repoArray)
        })

    }
}