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

let pourDummyData = function(size){
	let dummyData = '';
	let dummyUnit = `
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

	size = size || 50000;
	for(let i = 0; i < size; i++){
		dummyData += dummyUnit;
	}

	return dummyData;
};

exports.create_files = (dir, num, timestamp) => {
	let promises = [];
	let dummyData = pourDummyData();

	for(let i = 0; i < num; i++){
		promises.push(new Promise((resolve, reject) => {
			fs.mkdirSync(`${cnst.test_file_path}${dir}_${i}_${timestamp}_tt/`);
			fs.writeFile(`${cnst.test_file_path}${dir}_${i}_${timestamp}_tt/${timestamp + i}.html`, dummyData, () => {
				resolve(`${dir}_${i}_${timestamp}_tt/${timestamp + i}.html`);
			});
		}));
	}

	return Promise.all(promises);
};
