const {valToBase64, base64ToVal} = require('../base64convert');
const {isEqual} = require('lodash');
const assert = require('assert');


describe.only('base64 convert', () => {

	it('should convert numbers', () => {

		const val = 123;

		const str = valToBase64(val);

		assert(typeof str === typeof '');
		assert(base64ToVal(str) === val);


		const float = 3.1415926535;

		const str2 = valToBase64(float);

		assert(base64ToVal(str2) === float);


		const smallNum = 1.88e-13;

		const str3 = valToBase64(smallNum);

		assert(base64ToVal(str3) === smallNum);

	});


	it('should convert JSON objects', () => {

		const val = { a: { b: [1, 2, 3, 'hello'] }};

		const str = valToBase64(val);

		assert(typeof str === typeof '');
		assert(isEqual(base64ToVal(str), val));

	});


	it('should convert strings', () => {

		const val = 'hello\nworld!';

		const str = valToBase64(val);

		assert(typeof str === typeof '');
		assert(base64ToVal(str) === val);

	});




	// Only works in browser?
	
	function fileFromArrayBuffer(arr) {
		return new Blob([arr], {type: 'application/octet-binary'});
	}


	function fileToArrayBuffer(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}


	it('should convert serial data', () => {

		const arr = new Uint8Array([1, 2, 3]);
		const file = fileFromArrayBuffer(arr);

		const str = valToBase64(file);

		assert(typeof str === typeof '');


		const file2 = base64ToVal(str);
		const arr2 = fileToArrayBuffer(file2);

		assert(isEqual(arr, arr2));

	});

});