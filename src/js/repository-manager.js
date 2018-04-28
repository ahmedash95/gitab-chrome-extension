const RepoStorageKey = 'repos';
export default function RepositoryManager(storage){

	let getRepos = function () {
        let currentRepos = storage.get(RepoStorageKey);
        currentRepos = currentRepos === null ? [] : currentRepos.split(',');
        return currentRepos;
    };

	let updateRepos = function (repos) {
        storage.set(RepoStorageKey, repos.join(','));
        console.log(repos)
    };

	let hasRepo = function (name) {
        return getRepos().indexOf(name) > -1;
    };

	let addRepo = function (name) {
        if (hasRepo(name)) return;
        let currentRepos = getRepos();
        currentRepos.push(name);
        alert('Repo has been added: ' + name);
        updateRepos(currentRepos);
    };

	return {
		add: addRepo,
		all: getRepos
	}
}