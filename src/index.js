// Dependencies
import 'jquery';
import 'bootstrap';
import './scss/app.scss';
// Locale Modules
import Gitab from './js/gitab';
import Repository from './js/entities/repository';

let g = new Gitab();
g.draw('.repositories-container');

$('#submit-new-repo').on('click',function(){
	let repo = $('#repo').val();
	let valuesToWatch = $('.to-follow:checked').map(function(){
        return $(this).val();
    }).get();

	let r = new Repository(repo);
	$.each(valuesToWatch,function(i,v){
	    r.follow(v);
    });

	g.addNewRepo(r);
});

$('body').on('click','.edit-repo',function () {
    let el = $(this);
    let repoName = el.attr('data-repo');
    let r = g.getRepositroy(repoName);

    $('#editRepo').modal('show');

    let container = $('#editRepo');
    container.find('#edit-repo-name').val(r.getName());

    container.find('input[type="checkbox"]').prop('checked',false);
    r.shouldFollowList.forEach(function(v){
        container.find(`input[value="${v}"]`).prop('checked',true);
    });
});

$('body').on('click','#submit-edit-repo',function(){
    let el = $(this);
    let container = $('#editRepo');
    let repoName = container.find('#edit-repo-name').val();
    let r = new Repository(repoName);

    let valuesToWatch = $('.edit-to-follow:checked').map(function(){
        return $(this).val();
    }).get();

    $.each(valuesToWatch,function(i,v){
        r.follow(v);
    });

    g.updateRepo(r);
});