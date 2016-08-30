'use strict';

const Git = require('nodegit');
const common = require('./common');
const cnst = require('./constant');

let repo;

Git.Repository.open(cnst.cur_git_path)
.then((repoResult) => (repo = repoResult))
.then(() => repo.checkoutBranch(cnst.master_branch_name))
.then(() => repo.getHeadCommit())
.then((commit) => {
	return repo.createBranch(
		cnst.new_branch_name,
		commit,
		1,
		common.get_commiter_sign(cnst),
		'created a new branch named: new_branch'
	);
})
.then(() => repo.checkoutBranch(cnst.new_branch_name))
.then(() => repo.getBranch(cnst.new_branch_name))
.then((branch) => {
	console.log(branch.isHead() ? 'create sucess' : 'create failed');
	repo.free();
})
.catch((e) => console.log(e));

