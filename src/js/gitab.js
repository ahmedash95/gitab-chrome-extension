import HubStorage from './storage.js'
import RepositoryManager from './repository-manager.js'
import RepositoryPanel from './templates/repository-panel'

export default function Gitab() {

	let Storage = new HubStorage();
	let repository = new RepositoryManager(Storage);

	/*
	    Draw panel foreach repository
	 */
	let draw = function (selector) {
	    let container = $(selector);
	    repository.all().forEach(function(repo){
            let r = new RepositoryPanel(repo);
            container.append(r.render());
        });
    };


	return {
		getAllRepos:repository.all,
		addNewRepo:repository.add,
        getRepositroy:repository.get,
        updateRepo: repository.update,
		draw: draw
	}
}