'use strict';

const Git = require('nodegit');
const common = require('./common');
const cnst = require('./constant');

let repo;
let opts = {
checkoutStrategy: Git.Checkout.STRATEGY.SAFE |
  Git.Checkout.STRATEGY.RECREATE_MISSING
};

Git.Repository.open(cnst.cur_git_path)
.then((repoResult) => (repo = repoResult))
// 快进式合并需要使得:HEAD 指向最新分支
.then(() => repo.checkoutBranch(cnst.new_branch_name, opts))
// 前提: 有分支存在(new_branch)且与master有不同内容
// 可以依次执行示例代码中: create_branch.js/add_commit.js文件后再执行本文件查看merge情况
.then(() => repo.mergeBranches(
	cnst.master_branch_name,
	cnst.new_branch_name,
	common.get_commiter_sign(cnst),
	1
))
.then((commitId) => {
	console.log('merge success, commit id:', commitId.toString());
	repo.free();
})
.catch((e) => console.log(e));