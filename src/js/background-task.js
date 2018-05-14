import Gitab from './gitab';
import Issues from './services/issues';
import Notify from 'notifyjs';
import Storage from './services/storage';
import moment from 'moment';

let run = function () {
    storageService.set('last_time_run',moment().format('YYYY-MM-DD HH:mm:ss'));
    let g = new Gitab();
    let issuesService = new Issues();
    let repos = g.getAllRepos();
    for (let i = 0; i < repos.length; i++) {
        let repo = repos[i];
        let issues = issuesService.repo(repo.getName()).limit(10).get();
        issues.then(function (issuesList) {
            let currentIssuesIds = repo.getIssues().map(function (c) {
                return c.getId();
            })
            let newIssues = 0;
            for (let i = 0; i < issuesList.length; i++) {
                if (currentIssuesIds.indexOf(issuesList[i].id) > -1) {
                    break;
                }
                repo.addIssue(issuesList[i]);
                notify(repo.getName(),issuesList[i].title,issuesList[i].html_url);
                newIssues++;
            }
            console.warn(`Added ${newIssues} new issues to repo: ${repo.getName()}`);
        })
    }
};

let storageService = (new Storage).get();

let refreshDuration = '10';
let lastTimeRun = storageService.get('last_time_run');

let then = moment(lastTimeRun, 'YYYY-MM-DD HH:mm:ss');
let diff = moment().diff(then,'minutes') >= refreshDuration;

if(storageService.get('last_time_run') === null || diff) {
    run();
}

window.update_repos = function () {
    run();
};

function notify(repo,title,url) {
    (new Notify(repo, {
        body: title,
        notifyClick: function () {
            window.open(url,'_blank');
        }
    })).show();
}