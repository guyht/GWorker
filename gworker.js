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
 * Initialise self
 */
var self;

/*
 * Worker constructor
 *
 * There are issues prototyping the Worker constructor, therefore
 * this function simply spawns a GWorker object.
 *
 *  worker - Location of worker script
 *
 */
if(typeof Worker === 'undefined') {

	// Worker function
	Worker = function(worker)
	{
		return new GWorker(worker);
	};
}


/*
 * Inport Scripts functionality
 *
 * This is a web worker specific function that allows an outside
 * script to be loaded into the web worker.  Here we use the jQuery
 * ajax library to load the script.
 */
function importScripts(src)
{
	$.ajax({
		url : src,
		dataType : 'script',
		async : false
		});
}



/*
 * GWorker constructor
 *
 * Main constructor function.
 *
 *  worker - Location of the worker script
 *
 */
function GWorker(worker)
{
	var script = document.createElement('script'),
		script_pre = document.createElement('script'),
		script_post = document.createElement('script'),
		func = this,
		num_workers;

	this.ready = true;

	// Setup GWORKER namespace
	if(typeof GWORKER === 'undefined') {
		GWORKER = {};
		GWORKER.self = self;
		GWORKER.workers = [];
	}

	// Register new worker
	num_workers = GWORKER.workers.length;
	GWORKER.workers[num_workers] = {};
	this.worker_id = num_workers;
	this.worker_url = worker;

	if(typeof $ !== 'object') {
		// Load jQuery
		this.loadJQuery(function() {
				func.loadWorker();
		});
	}


	// Declare onmessage
	this.onmessage = {};

	// Setup postmessage function
	GWORKER.workers[this.worker_id].postMessage = function(message) { func.returnMessage(message); };
	GWORKER.workers[this.worker_id].postmessage = function(message) { func.returnMessage(message); };

}


GWorker.prototype = {

	postMessage : function(message) {
		if(!this.ready) {
			return;
		}

		self = GWORKER.workers[this.worker_id];
		GWORKER.workers[this.worker_id].onmessage({'data' : message});
		self = GWORKER.self;
	},

	returnMessage : function(message) {
		this.onmessage({'data' : message});
	},

	loadJQuery : function(callback) {

		this.ready = false;

		// Load JQuery library so we can use ajax
		var jquery_lib = document.createElement('script');
		jquery_lib.type = 'text/javascript';
		jquery_lib.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js';

		document.body.appendChild(jquery_lib);

		// Callback
		jquery_lib.onreadystatechange = callback;
		jquery_lib.onload = callback;
	 },

	loadWorker : function() {
		this.ready = true;

		var func = this;

		// Load the worker file using the jQuery ajax library
		self = GWORKER.workers[this.worker_id];
		$.ajax({
			url : func.worker_url,
			dataType : 'script',
			async : false
			});
		self = GWORKER.self;
	}
};



