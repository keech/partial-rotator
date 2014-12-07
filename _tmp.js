var img_ = document.createElement('img');
img_.src = canvas_.toDataURL();
img.onload = function(){
	ctx_.drawImage(img_, sx, sy, sw, sh, dx, dy, dw, dh);
}


//////////////////////////////////////////////////////////////
window.prototype = {
	hasProp: {}.hasOwnProperty,
	extends: function(child, parent){
		for(var key in parent){
			if(hasProp.call(parent, key)) child[key] = parent[key];
		}

		function ctor(){
			this.constructor = child;
		}
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();
		child.__super__ = parent.prototype;
		return child;
	}
};