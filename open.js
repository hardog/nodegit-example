'use strict';

const Git = require("nodegit");
const cnst = require('./constant');


Git.Repository.open(cnst.cur_git_path)
.then((repo) => {
	console.log('repo done, repo.workdir', repo.workdir());
	repo.free();
})
.catch((e) => {
	console.log(e);
});