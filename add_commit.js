'use strict';

const Git = require("nodegit");
const fs = require('fs');
const cnst = require('./constant');
const common = require('./common');

/**
 * This example creates a certain file `newfile.txt`, adds it to the git
 * index and commits it to head. Similar to a `git add newfile.txt`
 * followed by a `git commit`
**/

let repo;
let index;
let oid;

// api 说明
/*
Repository.open	: 打开本地仓库
Repository.createCommit	: 创建commit
Index.write 	: 将Index.addByPath的内容写进Index
Index.writeTree : 配置Index.write一起使用, 将文件写入到tree(git概念)里面
 */

Git.Repository.open(cnst.test_git_path)
.then((repoResult) => (repo = repoResult))
.then(() => {
	return fs.writeFileSync(
		cnst.add_commit_filename, 
		'add & commit file content new_again 2'
	);
})
.then(() => repo.refreshIndex())
.then((indexResult) => (index = indexResult))
.then(() => index.addByPath(cnst.add_commit_filename))
.then(() => index.write())
.then(() => index.writeTree())
// 注释以下行可以调试只add而不commit的情况
.then((oidResult) => {
  oid = oidResult;
  return Git.Reference.nameToId(repo, 'HEAD');
})
.then((head) => repo.getCommit(head))
.then((parent) => {
	let commit_msg = 'commit msg from add & commit';

	return repo.createCommit(
		'HEAD', 
		common.get_commiter_sign(cnst), 
		common.get_commiter_sign(cnst), 
		commit_msg, 
		oid,
		[parent]
	);
})
.done((commitId) => {
	repo.free();
	console.log('New Commit: ', commitId);
});
