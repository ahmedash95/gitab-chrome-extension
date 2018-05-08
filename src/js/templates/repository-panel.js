export default function RepositoryPanel(repo) {

    let issues = repo.getIssues();

    let render = function () {
        let htmlIssues = "";
        for(let i = 0; i < issues.length; i++) {
            let issue = issues[i];
            htmlIssues += `
                <li class="list-group-item">
                    <a href="${issue.getUrl()}">${issue.getTitle()}</a>
                </li>
            `
        }

        return `
        <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    ${repo.getName()}
                    <div class="col-md-3 pull-right text-right row">
                        <button class="btn btn-default btn-xs edit-repo" data-repo="${repo.getName()}">
                            <i class="glyphicon glyphicon-cog"></i>
                        </button>
                    </div>
                </div>
                <div class="panel-body list-group">
                    ${htmlIssues}    
                </div>
            </div>
        </div>
        `;
    };

    return {
        render: render
    };
}
