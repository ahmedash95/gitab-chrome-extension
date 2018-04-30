const RepoStorageKey = 'repos';
import Repository from './entities/repository.js';
export default function RepositoryManager(storage){

	let getRepos = function () {
        let currentRepos = storage.get(RepoStorageKey);
        currentRepos = currentRepos === null ? [] : JSON.parse(currentRepos);
        currentRepos = currentRepos.map(function (repo) {
            let r = new Repository(repo.name);
            $.each(repo,function (key,value) {
                r[key] = value;
            });
            return r;
        });
        return currentRepos;
    };

	let getRepositroy = function (name) {
        let repos = getRepos();
        let repo = {};
        repos.forEach(function(r){
            if(r.getName() == name){
                repo = r;
            }
        })
        return repo;
    };

	let updateRepo = function (repo) {
        let repos = getRepos()
        for(let i = 0; i < repos.length; i++){
            if(repos[i].getName() == repo.getName()){
                repos[i] = repo;
                break;
            }
        }
        updateRepos(repos);
    }

	let updateRepos = function (repos) {
        storage.set(RepoStorageKey, JSON.stringify(repos));
    };

	let addRepo = function (repo) {
        let currentRepos = getRepos();
        currentRepos.push(repo);
        alert('Repo has been added: ' + repo.getName());
        updateRepos(currentRepos);
    };

	return {
		add: addRepo,
		all: getRepos,
        get: getRepositroy,
        update:updateRepo,
	}
}