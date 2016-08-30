'use strict';

const Git = require('nodegit');
const common = require('./common');
const cnst = require('./constant');

let repo;

Git.Repository.open(cnst.cur_git_path)
.then((repoResult) => (repo = repoResult))
.then(() => Git.Remote.lookup(repo, 'origin'))
.then((remote) => {
	return remote.push(
		['refs/heads/master:refs/heads/master'],
	    {
	        callbacks: {
	          	credentials: (url, userName) => {
             		return Git.Cred.userpassPlaintextNew(cnst.account, cnst.password);
	          	},
	        	certificateCheck: () => {
	              return 1;
	            }
	        }
	    }
	);
})
.then(() => {
	console.log('push done');
	repo.free();
})
.catch((e) => console.log(e));