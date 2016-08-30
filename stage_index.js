'use strict';

const Git = require('nodegit');
const common = require('./common');
const cnst = require('./constant');

let repo;
let index;

Git.Repository.open(cnst.cur_git_path)
.then((repoResult) => (repo = repoResult))
.then(() => repo.refreshIndex())
.then((stage) => index = stage)
// 这里index.addByPath小心不要去异步执行否则后续的write都无效
.then(() => index.addByPath(cnst.add_commit_filename))
.then(() => index.write())
.then(() => index.writeTree())
// now unstaged or modified file has commit to local repo
.then((oid) => {
	console.log('oid:', oid);
	repo.free();
})
.catch((e) => console.log(e));