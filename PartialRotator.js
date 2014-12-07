function PartialRotator(img, prms){
	var self = this;

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.style.background = 'blue';

	var canvasX, canvasY, canvasW, canvasH;
	var onImgLoad = function(){};
	switch(prms.rotateType){
		case 'circle':
			canvas.width  = img.width;
			canvas.height = img.height;
			canvasX = prms.centerX - prms.radius;
			canvasY = prms.centerY - prms.radius;
			canvasW = prms.radius * 2;
			canvasH = prms.radius * 2;
			onImgLoad = function(_img){
				self.trim(canvas, _img, canvasX, canvasY, canvasW, canvasH);
				//self.cropCircle(canvas);
				// self.rotate(canvasTrimed, prms.angle);
			};
			break;
	}
	var _img = document.createElement('img');
	_img.src = img.src + '?' + Math.random();
	_img.onload = function(){
		onImgLoad(this);
	};
	document.getElementById('container').appendChild(canvas);
}

/////////////////////////////////////////////////////////
PartialRotator.prototype = {
	trim: function(canvas, img, sx, sy, sw, sh){
		var dx = 0,
				dy = 0,
				dw = sw,
				dh = sh;

		canvas.width = sw;
		canvas.height = sh;
		// canvas.style.position = 'absolute';
		// canvas.style.top   = sy + 'px';
		// canvas.style.left  = sx + 'px';

		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
	},
	cropCircle: function(canvas){
		var ctx = canvas.getContext('2d');
		var radius = Math.floor(canvas.width / 2 * 100) / 100;

		ctx.beginPath();
		ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
	},
	rotate: function(canvas, angle){
		var ctx = canvas.getContext('2d');
		var radius = Math.floor(canvas.width / 2 * 100) / 100;

		ctx.translate(radius, radius);
		ctx.rotate(angle * Math.PI / 180);
		ctx.translate(-radius, -radius);
	}
};
