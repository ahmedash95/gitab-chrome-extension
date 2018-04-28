export default function RepositoryPanel(name) {

    let render = function () {
        return `
        <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-heading">${name}</div>
                <div class="panel-body list-group">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Morbi leo risus</li>
                    <li class="list-group-item">Porta ac consectetur ac</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                </div>
            </div>
        </div>
        `;
    };

    return {
        render: render
    };
}
