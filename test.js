'use strict';
(function () {
	document.addEventListener("DOMContentLoaded", ready);

	function ready () {
		var inputFile = document.querySelector('.load-file');
		var inputNumber = document.querySelector('.numder-check');
		var c;
		var arrData;


		inputNumber.addEventListener('keyup', function (event) {
			if (event.target.value > 0) {
				inputFile.disabled = false;
			} else {
				inputFile.disabled = true;
			}
			inputFile.value = '';
		});

		inputFile.addEventListener('change', function (event) {
			readText(event.target.files[0]).then(function (arrData) {
				arrData.sort(sortAsc);
				c = parseInt(inputNumber.value, 10);
				check(arrData, c);
			});
		});
	}

	function readText (file) {
		return new Promise(function (resolve, reject) {
			var reader = new FileReader();
			reader.onload = function (event) {
				var contents = event.target.result;
				resolve(contents.split("\n").map(function (item) {
					return parseInt(item, 10);
				}));
			};
			reader.readAsText(file);
		});
	}

	function sortAsc (a, b) {
		return a - b
	}

	function check (data, number) {
		var iMin  = 0;
		var jMax = data.length;
		var jMin;

		var startTime = new Date();
		var endTime;

		for (iMin; iMin < jMax; iMin++) {
			for(jMin = iMin + 1; jMin < jMax; jMin++ ) {
				//console.log(iMin, jMin, _sum, number);
				var _sum = data[iMin] + data[jMin];
				if (_sum > number) {
					jMax = jMin;
				} else {
					if (_sum === number) {
						endTime = new Date();
						addResult(number, endTime - startTime, true);
						return console.log(endTime - startTime, number, 'ура нашли!');
					}
				}
			}
		}
		endTime = new Date();
		addResult(number, endTime - startTime, false);
		return	console.log(endTime - startTime, number, '-ненашли-');
	}

	function addResult(numder, time, result) {
		var tr = document.createElement('tr');
		tr.innerHTML = '<td>' + numder +'</td><td>'+ time + '</td><td>' + result+ '</td>';
		document.querySelector('table').appendChild(tr);
	}
})();