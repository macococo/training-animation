require([
	'../js/createjs/easeljs-0.6.0.min',
	'../js/createjs/tweenjs-0.4.0.min'
], function(
) {

	var canvas = document.getElementById('canvas'),
		stage = new createjs.Stage(canvas);

	createjs.Ticker.setFPS(60);

	var range = function(value, min, max) {
		if (value < min) {
			return min;
		}
		if (max <= value) {
			return max;
		}
		return value;
	};

	var createTwinkle = function() {
		// TODO canvas の width/height が欲しいけど、effect から取れないので決め打ち
		var _isMobile = true,
			margin = 100,
			canvasWidth = 640,
			canvasHeight = 840;

		var radius = (Math.random() * 20 + 13) >> 0;
		var sides = 6;
		var pointSize = (_isMobile) ? 0.85 : 0.9;
		var angle = (Math.random() * 360) >> 0;
		var color = createjs.Graphics.getHSL(angle, 100, 75);
		var glowAlpha = (_isMobile) ? 0.25 : 0.15;
		var glowColor1 = createjs.Graphics.getHSL(angle, 100, 75, glowAlpha);
		var glowColor2 = createjs.Graphics.getHSL(angle, 100, 75, 0);
		var shape = new createjs.Shape();
		var g = shape.graphics;
		g.beginRadialGradientFill([glowColor1, glowColor2], [0, 1], 0, 0, 0, 0, 0, 30);
		g.drawCircle(0, 0, 30);
		g.endFill();
		g.beginFill(color);
		g.drawPolyStar(0, 0, radius, sides, pointSize, angle);
		g.endFill();
		shape.x = range(canvasWidth * Math.random(), margin, canvasWidth - margin);
		shape.y = range(canvasHeight * Math.random(), margin, canvasHeight - margin);
		shape.scaleX = shape.scaleY = 0;
		shape.alpha = 0;
		shape.compositeOperation = 'lighter';
		if (!_isMobile) {
			shape.shadow = new createjs.Shadow(color, 0, 0, 5);
		}
		stage.addChild(shape);
		stage.update();

		var tween = createjs.Tween.get(shape)
			.to({scaleX: 1, scaleY: 1, alpha: 1}, 300, createjs.Ease.sineOut)
			.to({scaleX: 0, scaleY: 0, alpha: 0}, 600, createjs.Ease.sineIn)
			.call(function() {stage.removeChild(shape)});
	};

	var twinkleAnimation = function() {
		setTimeout(function() {
			createTwinkle();
			twinkleAnimation();
		}, 200);
	};

	twinkleAnimation();

});
