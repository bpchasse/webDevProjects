/* *
 * Tests [Function: fib]
 *  -> Calls the fibonacci number producing function with many invalid and valid arguments 
 */
function main() {
	var testArgs = [[''], ['1,1'], [[1],[1]] , [[1],[1],[1]], ['0'], ['-1'], ['\'hello\''], ['\"hello\"'],
					[1], ['\'1\''], [2], ['\'2\''], [5], [10], ['\'10\''], [20], [35], [40]];
	testArgs.forEach(function (args, i) {
		process.stdout.write(i + 1 + '. Calling fib(' + args + ') with argument(s) being ' + args.length + ' argument(s)...');
		console.log(fib.apply(this, args));
	});
}

/**
 * Determines the nth fibonacci number if the passed arguments are 'valid'
 *  -> wraps private functionality
 * @param {Number} n -- numbered list index of the desired fibonacci number
 * @returns {Number} -- The n'th fibonacci number (undefined if invalid arguments)
 */
function fib(n) {
	if (_checkArg(arguments)) {
		return _getNthFib(n);
	} else {
		return undefined;
	}
}

/**
 * Get the nth fibonacci number
 * TODO:'Eww, it's recursive!'
 * @param {Number} n -- numbered list index of the desired fibonacci number
 * @returns {Number} -- The n'th fibonacci number
 * @private
 */
function _getNthFib(n) {
	return n < 2 ? n : _getNthFib(n - 1) + _getNthFib(n - 2);
}

/**
 * Returns true if there is only one argument and that argument is a number
 * Retruns false if there is not exactly one argument or the only argument is NaN
 * @param {Object} argObject -- the passes native argument object
 * @private
 */
function _checkArg(argObject) {
	if (argObject[0]) {
		if(argObject.length >= 2) {
			return false;
		} else if (typeof argObject[0] === 'number') {
			var returnVal = (argObject[0] >= 0) ? true : false;
			return returnVal;
		}
	} else {
		return false;
	}
}

/* Begin the execution sequence */
main();
