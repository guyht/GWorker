/*
 *  GWorker - Enables Web Worker functionality in IE and non HTML5 compatible
 *  browsers.
 *
 *  Copyright (C) 2011  Guy Halford-Thompson
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/*
 * GWorker Testing Suite
 *
 * This test suite uses the sha-256 example.  It initiates a web worker
 * and hashes the string 'gworker'.
 *
 */


var testCase = new YAHOO.tool.TestCase({

	name: "GWorker Test Case",

	testWebWorker: function() {
		var Assert = YAHOO.util.Assert,
			sha256,
			func = this;

		sha256 = new Worker('sha-256-worker.js');
		sha256.onmessage = function(event) {
			func.resume();
			Assert.areEqual(event.data, '6a13cd61d43dbfcaa34f1abae67454f0d9435a543c33bb1e197dd0644bfa2f0f');
		};
		sha256.postMessage('gworker');
		this.wait(null, 1000);
	}
});

var oLogger = new YAHOO.tool.TestLogger('gworker_logger');
YAHOO.tool.TestRunner.add(testCase);
YAHOO.tool.TestRunner.run();
