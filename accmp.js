'use strict';

// accmp : short for add commit checkout merge push,
// whole example from add file to stage to push to remote

const Git = require('nodegit');
const _ = require('underscore');
const common = require('./common');
const cnst = require('./constant');

let gitAddCommit = (files) => {
	let index, repo, oid;

	return Git.Repository.open(cnst.test_git_path)
	.then((repoResult) => repo = repoResult)
	.then(() => repo.refreshIndex())
	.then((indexResult) => index = indexResult)
	.then(() => {
		let promises = [];
		// TODO
		_.each(files, (v) => {
			promises.push(index.addByPath(v));
		});
		
		return Promise.all(promises);
	})
	// 将文件写入到tree
	.then(() => index.write())
	.then(() => index.writeTree())
	.then((oidResult) => oid = oidResult)
	.then(() => Git.Reference.nameToId(repo, 'HEAD'))
	.then((head) => repo.getCommit(head))
	.then((parent) => {
		return repo.createCommit(
			'HEAD', 
			common.get_commiter_sign(cnst), 
			common.get_commiter_sign(cnst), 
			'system commit file : ' + files.join(','), 
			oid, 
			[parent]
		);
	})
	.then(() => repo.free());
};

let gitCheckoutBranch = (branchName, mainBranch) => {
	let repo;

	// 先切分支, 再copy文件
	return Git.Repository.open(cnst.test_git_path)
	.then((repoResult) => repo = repoResult)
	.then(() => {
		return new Promise((resolve) => {
			repo.getBranch(branchName)
			.then(() => resolve(true), () => resolve(false));
		});
	})
	.then((result) => {
		if(!result){
			return repo.checkoutBranch(mainBranch)
			.then(() => repo.getHeadCommit())
			.then((commit) => {
				return repo.createBranch(
					branchName, 
					commit, 
					true, 
					common.get_commiter_sign(cnst), 
					'Created new branch : '+branchName
				);
			});
		} else {
			return Promise.resolve();
		}
	})
	.then(() => repo.checkoutBranch(branchName))
	.then(() => repo.free());
};

let gitMerge = ( branchName, mainBranch ) => {
	let repo;

	return gitCheckoutBranch(branchName)
	.then(() => Git.Repository.open(cnst.test_git_path))
	.then((repoResult) => repo = repoResult)
	.then(() => {
		return repo.mergeBranches(
			mainBranch, 
			branchName, 
			common.get_commiter_sign(cnst), 
			1
		);
	})
	.then(() => repo.free());
};

let gitPush = (branchName, mainBranch) => {
	let repo;

	return gitCheckoutBranch( mainBranch, mainBranch )
	.then(() => Git.Repository.open(cnst.test_git_path))
	.then((repoResult) => repo = repoResult)
	.then(() => Git.Remote.lookup(repo, 'origin'))
 	.then((remote) => {
 		return remote.push(
	    	['refs/heads/'+mainBranch+':refs/heads/'+mainBranch],
		    {
		        callbacks: {
		        	credentials : () => Git.Cred.userpassPlaintextNew(cnst.account, cnst.password)
		        }
		    }
	    );
 	})
 	.then(() => repo.free());
};

let loop = 0;
// start push 
setInterval(() => {
	loop++;
	console.log('loop', loop);

	Promise.resolve()
	.then(() => gitCheckoutBranch(`test${loop}`, 'master'))
	.then(() => common.create_files(loop, 1, +new Date()))
	.then((files) => gitAddCommit(files))
	.then(() => gitMerge(`test${loop}`, 'master'))
	.then(() => gitPush('master', 'master'))
	.catch((e) => console.log(e));
}, 5000);
