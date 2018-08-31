export default function (option={}) {
	option = {
		color: option.color || 'gold',
		fill : option.fill  || true,
		w : option.w  || 100,
		h : option.h  || 70,
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

	ctx.moveTo(w*50/100,	h*0/70);
	ctx.lineTo(w*25/100,	h*50/70);
	ctx.lineTo(w*0/100,		h*25/70);
	ctx.lineTo(w*10/100,	h*70/70);
	ctx.lineTo(w*90/100,	h*70/70);
	ctx.lineTo(w*100/100,	h*25/70);
	ctx.lineTo(w*75/100,	h*50/70);
	ctx.lineTo(w*50/100,	h*0/70);

	if (option.fill) {ctx.fill()}
		else ctx.stroke();

	return canvas;
}