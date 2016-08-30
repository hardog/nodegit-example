'use strict';


const Git = require('nodegit');
const cnst = require('./constant');

let repo;

Git.Repository.open(cnst.cur_git_path)
.then((repoResult) => (repo = repoResult))
// HEAD 指向 cnst.checkout_branch 分支
.then(() => repo.checkoutBranch(cnst.checkout_branch))
.then(() => repo.getBranch(cnst.checkout_branch))
.then((branch) => {
	console.log(branch.isHead() ? 'checkout success' : 'checkout failed');
	repo.free();
})
.catch((e) => console.log(e));
