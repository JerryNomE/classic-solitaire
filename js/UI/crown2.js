export default function (option={}) {
	option = {
		color: option.color || 'gold',
		fill : option.fill  || false,
		w : option.w  || 100,
		h : option.h  || 100,
	};

	let w = option.w;
	let h = option.h;

	let canvas = document.createElement('canvas');
	canvas.width = option.w;
	canvas.height = option.h;
	let ctx = canvas.getContext('2d');


	if (option.fill) {ctx.fillStyle = option.color}
		else ctx.strokeStyle = option.color;

	ctx.beginPath();

	ctx.moveTo(0,100);
	ctx.quadraticCurveTo(50,90,100,100);
	ctx.quadraticCurveTo(50,80,0,100);
	if (option.fill) {ctx.fill()}
		else ctx.stroke();

	ctx.moveTo(0,100);
	ctx.quadraticCurveTo(20,90,5,83);
	ctx.quadraticCurveTo(0,94,20,94);
	ctx.quadraticCurveTo(43,85,27,75);
	ctx.quadraticCurveTo(17,85,40,91);
	ctx.quadraticCurveTo(75,65,50,50);
	ctx.stroke();

	ctx.save();
	ctx.translate(100,0);
	ctx.scale(-1,1);
	ctx.moveTo(0,100);
	ctx.quadraticCurveTo(20,90,5,83);
	ctx.quadraticCurveTo(0,94,20,94);
	ctx.quadraticCurveTo(43,85,27,75);
	ctx.quadraticCurveTo(17,85,40,91);
	ctx.quadraticCurveTo(75,65,50,50);
	ctx.stroke();
	ctx.restore();

	return canvas;
}