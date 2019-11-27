"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GithubApiService_1 = require("./GithubApiService");
var lodash_1 = __importDefault(require("lodash"));
var svc = new GithubApiService_1.GithubApiService();
svc.getUserInfo('barbaravasic', function (user) {
    svc.getRepos('barbaravasic', function (repos) {
        var sortedRepos = lodash_1.default.sortBy(repos, function (repo) { return repo.size * -1; });
        var filteredRepos = lodash_1.default.take(sortedRepos, 5);
        user.repos = filteredRepos;
        console.log(user);
    });
});
