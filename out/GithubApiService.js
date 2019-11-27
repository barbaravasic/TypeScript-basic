"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var User_1 = require("./User");
var Repo_1 = require("./Repo");
// const OPTIONS: any = {
//     headers: {
//         'User-Agent': 'request'
//     },
//     json: true
// }
var instance = axios_1.default.create({
    baseURL: 'https://api.github.com/users/',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        'User-Agent': 'request'
    }
});
var GithubApiService = /** @class */ (function () {
    function GithubApiService() {
    }
    GithubApiService.prototype.getUserInfo = function (userName, cb) {
        return instance.get("" + userName)
            .then(function (response) {
            var user = new User_1.User(response.data);
            cb(user);
        });
    };
    GithubApiService.prototype.getRepos = function (userName, cb) {
        return instance.get(userName + "/repos")
            .then(function (response) {
            var repoArray = response.data.map(function (repo) { return new Repo_1.Repo(repo); });
            cb(repoArray);
        });
    };
    return GithubApiService;
}());
exports.GithubApiService = GithubApiService;
