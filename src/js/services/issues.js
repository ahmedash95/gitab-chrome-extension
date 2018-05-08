export default function Issues(){
    const endPoint = 'https://api.github.com/repos'
    let params = {
        'state' : 'all'
    }

    let repoName;
    let limit = 10;
    let setRepo  = function (name) {
        repoName = name;
        return this;
    }
    let setLimit = function (n) {
        n = parseInt(n)
        if(n < 1){
            throw "Limit must be an intger larger than 0";
        }
        limit = n;
        return this;
    }

    let get = function () {
        console.warn(`Fetching issues for repository ${repoName}`);
        let paramsString = $.param(params)
        return fetch(`${endPoint}/${repoName}/issues?${paramsString}`)
            .then(function(response) {
                return response.json();
            })
    }

    return {
        repo: setRepo,
        limit: setLimit,
        get: get
    }
}