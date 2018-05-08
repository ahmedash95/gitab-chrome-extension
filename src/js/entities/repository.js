import Issue from './issue';
import StorageService from '../services/storage'

const ListToFollow = [
    'issues',
    'pull-requests',
    'merged-pull-requests',
];
const IssuesStorageKey = 'issues';
const Storage = (new StorageService).get()

export default function Repository(name) {
    let repoName = name;

    let getName = function () {
        return repoName;
    };

    let shouldFollowList = [];

    let isFollow = function(key){
        return shouldFollowList.indexOf(key) !== -1;
    };

    let getFollowingList = function () {
        return shouldFollowList;
    };

    let follow = function (toFollow) {
        if(ListToFollow.indexOf(toFollow) === -1){
            throw 'The repository must follow one of these items : ' + ListToFollow.join(',');
        }
        if(shouldFollowList.indexOf(toFollow) > -1){
            throw 'The repository already following : ' + toFollow;
        }
        shouldFollowList.push(toFollow);
    };



    let getIssues = function () {
        let currentIssues = Storage.get(`${IssuesStorageKey}:${repoName}`);
        currentIssues = currentIssues === null ? [] : JSON.parse(currentIssues);
        currentIssues = currentIssues.map(function (repo) {
            let i = new Issue();
            $.each(repo,function (key,value) {
                i[`set${key[0].toUpperCase() + key.slice(1)}`](value);
            });
            return i;
        });
        return currentIssues;
    };

    let addIssue = function (issue) {
        let i = new Issue;
        i.setTitle(issue.title)
        i.setId(issue.id)
        i.setUrl(issue.html_url)
        i.setState(issue.state)
        i.setUserName(issue.user.login)
        i.setUserImage(issue.user.avatar_url)
        let newIssues = getIssues().slice();
        newIssues.unshift(i)
        updateIssues(newIssues);
    }

    let updateIssues = function (issues) {
        let newIssuesList = [];
        for(let i = 0; i < issues.length; i++){
            newIssuesList.push(issues[i].toJson());
        }
        Storage.set(`${IssuesStorageKey}:${repoName}`, JSON.stringify(newIssuesList));
    }

    return {
        name: repoName,
        shouldFollowList:shouldFollowList,
        getName: getName,
        follow: follow,
        isFollow: isFollow,
        getFollowingList: getFollowingList,
        getIssues: getIssues,
        addIssue: addIssue,
    }
}