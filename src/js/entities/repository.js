const ListToFollow = [
    'issues',
    'pull-requests',
    'merged-pull-requests',
];
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

    return {
        name: repoName,
        shouldFollowList:shouldFollowList,
        getName: getName,
        follow: follow,
        isFollow: isFollow,
        getFollowingList: getFollowingList
    }
}