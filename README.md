# Documentaion

## Preamble
There are a few things to note before using this script:

* This script is a work in progress and should be considered to be in a beta state
* This script will not allow multi threading, but will allow web workers, that would otherwise not work in older browsers, to work in synchronously within your scrips.
* This script may make your JavaScript less secure. 
* Although this script will work with most web workers, it will not work with _all_ web workers.
* Some web workers will need to be modified to work with this script.  __NOTE:__ This will not break the functionality of the web workers when not using this script.

## So... why use this script?
Web workers are one of the most (if not the most) powerful features in HTML 5, however their adoption will be very slow because, for a long time, the majority of browsers will not support them.  This forces anyone wishing to use web workers to also duplicate their code for situations where web workers are not supported, a task that is both laborious and (in the context of a company) expensive.  This script removes code duplication and allows developers to use web workers without having to worry about browser compatibility.  Although only browsers that are support web workers will run the script in a multi thread environment, the web workers will still work on all non supported browsers, albeit at a 'synchronous' cost.  

However, not all web workers need to be computationally intensive.  My wiki parsing script (see examples) makes good use of web workers, but also performs very well in browsers in which web workers are not suppored.

In a sense, this script encourages the adoption of web workers.


## Advantages and Disadvantages of using this script
### Advantages
* You web workers will be _forwards_ compatible.  A web worker that works with this script will also work natively in an HTML 5 compliant browser.
* You will not have to duplicate the functionality of you web workers to allow for non HTML 5 compatible browsers.
* There is almost no installation necessary, simply include the GWorker.js script and you can use web workers as you would in any HTML 5 compliant browser.

### Disadvantages / Limitations
* This is essentially a hack
* Not _all_ web workers will work with this script.  This is usually due to one of two things. 1. Web workers using other HTML 5 features, such as a canvas. 2. Problems with duplicate functions (this is because some of the web workers functions will get exposed into the global namespace and could clash with other existing functions).
* Some web workers will require some modification to work, namely declaring the onmessage and postMessage in the _self_ namespace.  This will __not__ break compatibility when not using this script.
* Your web workers will be run __synchronously__ meaning that your scripts will hang until the web worker has finished executing.

## Installation
Installation is simple.  Simply download the jquery.js and gworker.js files add the following two lines to the head tag of any pages in which your use web workers.

    <script src="jquery.js" type="text/javascript"></script>
    <script src="gworker.js" type="text/javascript"></script>

Make sure you change the paths so that they point to the correct locations.  If you already use jQuery, then you do not need the jquery.js file, but make sure that jquery is included before gworker.js.  This is because gworker.js uses the jQuery library to implement the importScripts function.  Also make sure that gworker.js is included before any scripts that use web workers.

### Important
In order for this script to function, you must declare the onmessage and postMessage functions in your web worker in the __self__ namespace.  This is because the script substitutes the __self__ namespace for a custom variable before loading web workers, allowing each worker to run in its own namespace.  __NOTE:__ Some web workers declare these functions in the __self__ namespace already, some dont.  This will not affect the functionality of your web worker in HTML 5 compliant browsers.

    self.onmessage = function(event) {
     //.... worker code
     self.postMessage(response);
    }

See the examples for more information.

## Examples
All the examples are contained in the _examples_ directory.  Simply open up the .html file in your favourite browser (or a non HTML 5 compliant one) and play around with the examples.

The examples are also available to view at the following URLs:

* Parser example: http://guyht.github.com/GWorker/examples/parser/wiki.html
* SHA-256 example: http://guyht.github.com/GWorker/examples/sha-256/sha-256.html

## Running the tests
The tests use the Yahoo UI Test suite.  The dependencies are loaded from the Yahoo servers and so you will need an internet connection to run the tests.  To run the test suite just open up test-suite.html in your browser.

## Contribution
#### Can I contribute?

I welcome all contributions, simply fork the github repository, make your changes, and issue a pull request.

#### I have found a bug

Either log it as an issue in the issue tracker on github or send me and email at guy@cach.me


