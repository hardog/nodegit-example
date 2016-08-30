'use strict';

const Git = require("nodegit");
const pkg = require('./package');
const cnst = require('./constant');

const Clone = Git.Clone.clone;
/*
if you use not NFS filesystem, error would comes to you!
-----------------------
Failed to mmap. Could not write data: Invalid argument
Error: Failed to mmap. Could not write data: Invalid argument
    at Error (native)
-----------------------
help from GitHub: https://github.com/nodegit/nodegit/issues/1115
it's the filesystem cause it
 */

let cloneOptions = {};
cloneOptions.fetchOpts = {
	callbacks: {
      certificateCheck: () => {
        return 1;
      }
    }
};
// 复制当前repo仓库
Clone(
	pkg.repository.url, 
	`${cnst.tmp_dir}/${pkg.name}`,
	cloneOptions
)
.then((repo) => {
	console.log('repo done!');
})
.catch((e) => {
	console.log(e.message);
	console.log(e.stack);
});
