"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const User_1 = require("./User");
const Repo_1 = require("./Repo");
const instance = axios_1.default.create({
    baseURL: 'https://api.github.com/users/',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        'User-Agent': 'request'
    }
});
class GithubApiService {
    getUserInfo(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResponse = yield instance.get(`${userName}`);
            const repos = yield this.getRepos(userName);
            const sortedRepos = lodash_1.default.sortBy(repos, (repo) => repo.size * -1);
            const filteredRepos = lodash_1.default.take(sortedRepos, 5);
            const user = new User_1.User(userResponse.data, filteredRepos);
            return user;
        });
    }
    getRepos(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield instance.get(`${userName}/repos`);
            return response.data.map((repo) => new Repo_1.Repo(repo));
        });
    }
}
exports.githubApiService = new GithubApiService();
