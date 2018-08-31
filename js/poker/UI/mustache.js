// 输出比例：100:40


// 由于画的时候是直接在卡片上画的，现在把它提出来
// ctx.strokeRect(17,80,106,40); // 大小
export default function (option={}) {
	option = {
		color: option.color || 'black',
		fill : option.fill  || true,
		w : option.w  || 106,
		h : option.h  || 40,
	};
	let w = option.w * 140 / 106;
	let h = option.h * 200 / 40;

	let canvas = document.createElement('canvas');
	canvas.width = option.w;
	canvas.height = option.h;
	let ctx = canvas.getContext('2d');
	ctx.save();

	ctx.translate(-w*17/140,-h*80/200);

	// 中间
	if (option.fill) {ctx.fillStyle = option.color}
		else ctx.strokeStyle = option.color;
	ctx.beginPath();
	ctx.moveTo(w*1/2, h*10/20);
	ctx.quadraticCurveTo(w*2/8, h*6/10, w*3/16, h*1/2);
	ctx.quadraticCurveTo(w*3/16, h*4/9, w*2/8, h*4/9);
	ctx.quadraticCurveTo(w*3/9, h*17/36, w*2/8, h*1/2);

	ctx.quadraticCurveTo(w*4/10, h*9/20, w*2/8, h*4/10);
	ctx.quadraticCurveTo(w*3/19, h*8/20, w*3/23, h*1/2);
	ctx.quadraticCurveTo(w*2/8, h*10/15, w*1/2, h*11/20);

	if (option.fill) {ctx.fill()}
		else ctx.stroke();

	ctx.save();
	ctx.translate(w,0);
	ctx.scale(-1,1);
	ctx.beginPath();
	ctx.moveTo(w*1/2, h*10/20);
	ctx.quadraticCurveTo(w*2/8, h*6/10, w*3/16, h*1/2);
	ctx.quadraticCurveTo(w*3/16, h*4/9, w*2/8, h*4/9);
	ctx.quadraticCurveTo(w*3/9, h*17/36, w*2/8, h*1/2);

	ctx.quadraticCurveTo(w*4/10, h*9/20, w*2/8, h*4/10);
	ctx.quadraticCurveTo(w*3/19, h*8/20, w*3/23, h*1/2);
	ctx.quadraticCurveTo(w*2/8, h*10/15, w*1/2, h*11/20);

	if (option.fill) {ctx.fill()}
		else ctx.stroke();

	ctx.restore();

	return canvas;
}