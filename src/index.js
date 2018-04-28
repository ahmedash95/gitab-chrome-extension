// Dependencies
import 'jquery';
import 'bootstrap';
import './scss/app.scss';
// Locale Modules
import Gitab from './js/gitab'

let g = new Gitab();
g.draw('.repositories-container');

$('#submit-new-repo').on('click',function(){
	let repo = $('#repo').val();
	g.addNewRepo(repo);
});
