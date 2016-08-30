'use strict';

const fs = require('fs');
const cnst = require('./constant');


if(!fs.exists(cnst.tmp_dir)){
	fs.mkdirSync(cnst.tmp_dir);
}
console.log(`tmp dir ${cnst.tmp_dir} was created!`);

