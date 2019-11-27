import { githubApiService } from './GithubApiService'
import _ from 'lodash'
import { User } from './User'
import { Repo } from './Repo'

const printUser = async () => {
    try {
        const user = await githubApiService.getUserInfo('barbaravasic')

        console.log(user)
    } catch(e) {
        console.log(e)
    }
}

printUser()



