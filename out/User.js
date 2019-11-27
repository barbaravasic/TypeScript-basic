"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(userResponse, repos) {
        this.login = userResponse.login;
        this.fullName = userResponse.name;
        this.repoCount = userResponse.public_repos;
        this.followerCount = userResponse.followers;
        this.repos = repos;
    }
}
exports.User = User;
