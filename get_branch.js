'use strict';

const Git = require('nodegit');
const cnst = require('./constant');

let repo;

Git.Repository.open(cnst.cur_git_path)
.then((repoResult) => (repo = repoResult))
.then(() => repo.getBranch(cnst.branch_name))
.then((branch) => {
	// 是否当前正处于的分支
	console.log('is head:', branch.isHead());
	repo.free();
})
.catch((e) => console.log(e));