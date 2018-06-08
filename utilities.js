(function(window){

	U = window.U || {};

	 U.arrayToObj = function(array, keyValueMap) {
		var obj = {};
		var len = array.length;
		// Your function will be called for each item in the array.
		for (var i = 0; i < len; i++) {
			var curVal = array[i];
			// Just like with [].forEach(), your function will be passed the
			// curent item of the array, its index, and the array it's in.
			var keyValuePair = keyValueMap(curVal, i, array);
			// Your function should return a 2-value array with the key
			// and value for a new property in the object to be returned.
			obj[keyValuePair[0]] = keyValuePair[1];
		}
		return obj;
	}

	U.catalogKeyMap = function(item){
	return [item.id, item]
	}

	U.isHTML = function(str) {
		  var doc = new DOMParser().parseFromString(str, "text/html");
		  return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
		}

	U.nodeToTxt = function(str){
		var doc = new DOMParser().parseFromString(str, "text/html");
		var output = [];
		Array.from(doc.body.childNodes).forEach(function(node){
			output.push(node.innerHTML);
		});
		return output;
	}

	//M = window.M || {};
	U.Story = window.story["13-ways"];
	U.catalog = window.story.catalog || [];
	U.catalog = U.arrayToObj(U.catalog, U.catalogKeyMap);
	//console.log(M.catalog, M.Story);

})(window);

