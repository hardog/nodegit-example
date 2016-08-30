'use strict';

const Git = require('nodegit');
const fs = require('fs');
const _ = require('underscore');
const cnst = require('./constant');

exports.get_commiter_sign = (cnst) => {
	let timestamp = +new Date();

	return Git.Signature.create(
		cnst.commiter_name, 
		cnst.commiter_email, 
		timestamp, 
		60
	);
};

exports.create_files = (dir, num, timestamp) => {
	let promises = [];
	let dummyData = `
		HH 		HH   HHHHHHH
		HH 		HH     HHH
		HH 		HH 	   HHH
		HH 		HH 	   HHH
		HHHHHHHHHH 	   HHH
		HHHHHHHHHH 	   HHH
		HH 		HH 	   HHH
		HH 		HH 	   HHH
		HH 		HH     HHH
		HH 		HH   HHHHHHH
	`;

	for(let i = 0; i < num; i++){
		promises.push(new Promise((resolve, reject) => {
			fs.mkdirSync(`${cnst.test_file_path}${dir}_${i}/`);
			fs.writeFile(`${cnst.test_file_path}${dir}_${i}/${timestamp + i}.html`, dummyData, () => {
				resolve(`${dir}_${i}/${timestamp + i}.html`);
			});
		}));
	}

	return Promise.all(promises);
};