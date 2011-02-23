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
 * This is a Javascript Worker to parse wiki code into HTML
 *
 * The script will parse the following:
 * ===== Level 5 Title ===== -> <h5>Level 5 Title</h5>
 * ==== Level 4 Title ====   -> <h4>Level 4 Title</h4>
 * === Level 3 Title ===     -> <h3>Level 3 Title</h3>
 * == Level 2 Title ==       -> <h2>Level 2 Title</h2>
 * = Level 1 Title =         -> <h1>Level 1 Title</h1>
 * *Bold*                    -> <b>Bold</b>
 * _Italic_                  -> <i>Italic</i>
 */
 
// Recieve message
self.onmessage = function(event) {
	var r = parseWiki(event.data); 
	self.postMessage(r);
};
 
 
 
/*
 * Function to parse the wiki text and return the html.
 *
 *  _w      - The wiki text
 *
 *  returns - String containing parsed HTML
 *
 */
function parseWiki(_w) {
 
	var t;
 
	// Parse the wiki data
	t = _w.replace(/=====(.*?)=====/g, '<h5>$1</h5>');
	t = t.replace(/====(.*?)====/g, '<h4>$1</h4>');
	t = t.replace(/===(.*?)===/g, '<h3>$1</h3>');
	t = t.replace(/==(.*?)==/g, '<h2>$1</h2>');
	t = t.replace(/=(.*?)=/g, '<h1>$1</h1>');
	t = t.replace(/\*(.*?)\*/g, '<b>$1</b>');
	t = t.replace(/\_(.*?)\_/g, '<i>$1</i>');
	t = t.replace(/\n/g, '<br />' );
 
	// Return the parsed data
	return t;
}
