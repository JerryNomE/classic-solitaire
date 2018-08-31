let w = 140;
let h = 200;
export default function () { // 长成匕首的剑。。。
	let canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	let ctx = canvas.getContext('2d');

	// 中间
	ctx.strokeStyle = 'black';
	ctx.beginPath();
	ctx.moveTo(w*2/5, h*5/7);
	ctx.lineTo(w*2/5, h*2/6)
	ctx.lineTo(w*1/2, h*1/8);
	ctx.lineTo(w*3/5, h*2/6);
	ctx.lineTo(w*3/5, h*5/7);

	ctx.moveTo(w*1/2, h*2/7);
	ctx.lineTo(w*1/2, h*5/7);

	ctx.moveTo(w*1/5, h*5/7);
	ctx.lineTo(w*4/5, h*5/7);
	ctx.lineTo(w*7/9, h*3/4);
	ctx.lineTo(w*2/9, h*3/4);
	ctx.lineTo(w*1/5, h*5/7);

	ctx.moveTo(w*4/9, h*3/4);
	ctx.lineTo(w*4/9, h*9/10);
	ctx.lineTo(w*5/9, h*9/10);
	ctx.lineTo(w*5/9, h*3/4);

	ctx.moveTo(w*4/9,  h*16/20);
	ctx.lineTo(w*7/13, h*16/20);

	ctx.moveTo(w*4/9,  h*17/20);
	ctx.lineTo(w*7/13, h*17/20);

	ctx.stroke();

	return canvas;
}