let suits = {
	spade(w,h,ctx) {
		let p1 = {x:w*80/170,  y:h*120/170}; // 头部
		let p2 = {x:w/2,       y:0};
		let p3 = {x:w*90/170,  y:h*120/170};

		let bx1 = w*.8; // 三次贝塞尔曲线控制点x的偏移值
		let bx2 = w*.4;

		let by1 = h*.3; // 三次贝塞尔曲线控制点y的值
		let by2 = h*1.1;

		let Root = h;

		ctx.beginPath();
		// 头部
		ctx.moveTo(p1.x,p1.y);
		ctx.bezierCurveTo(
			p1.x-bx2, by2,
			p1.x-bx1, by1,
			p2.x, p2.y);
		ctx.bezierCurveTo(
			p3.x+bx1, by1,
			p3.x+bx2, by2,
			p3.x, p3.y);
		// 根部
		ctx.quadraticCurveTo(p3.x, Root, w*130/170, Root);
		ctx.lineTo(w*40/170, Root);
		ctx.quadraticCurveTo(p1.x, Root, p1.x, p1.y);
	},
	heart(w,h,ctx) {
		let s = {x:w/2, y:h/5};	// 上方凹下去的点
		let e = {x:w/2, y:h};	// 下方凸出来的点

		let bx1 = w*35/150;		// 三次贝塞尔曲线控制点x的偏移值
		let bx2 = w*149/150;

		let by1 = -h*50/150;	// 三次贝塞尔曲线控制点y的值
		let by2 = h/3;

		ctx.beginPath();
		ctx.moveTo(s.x,s.y);
		ctx.bezierCurveTo(s.x+bx1, by1, s.x+bx2, by2, e.x,e.y);
		ctx.bezierCurveTo(s.x-bx2, by2, s.x-bx1, by1, s.x,s.y);
	},
	club(w,h,ctx) {
		let r = w*(40/170);

		let p1 = {x:r,   y:w*(105/170)};
		let p2 = {x:w/2, y:r};
		let p3 = {x:w-r, y:w*(105/170)};

		let Root = h;

		// 头部
		ctx.beginPath();
		ctx.arc(p1.x, p1.y, r, 0,                 315*Math.PI/180);
		ctx.arc(p2.x, p2.y, r, 112.5*Math.PI/180, 67.5*Math.PI/180);
		ctx.arc(p3.x, p3.y, r, 225*Math.PI/180,   180*Math.PI/180);
		// 根部
		ctx.quadraticCurveTo(p3.x-r, Root, p3.x, Root);
		ctx.lineTo(p1.x,Root);
		ctx.quadraticCurveTo(p1.x+r, Root, p1.x+r, p1.y);
	},
	diamond(w,h,ctx) {
		let bx = w*.1;
		let by = h*.1;

		let x1 = w*.1; // 左
		let y1 = h*0; // 上
		let x2 = w*.5; // 中
		let y2 = h*.5; // 中
		let x3 = w*.9; // 右
		let y3 = h*1; // 下

		ctx.beginPath();
		ctx.moveTo(x2,y1);
		ctx.quadraticCurveTo(x2 - bx, y2 - by, x1, y2); // ↙
		ctx.quadraticCurveTo(x2 - bx, y2 + by, x2, y3); // ↘
		ctx.quadraticCurveTo(x2 + bx, y2 + by, x3, y2); // ↗
		ctx.quadraticCurveTo(x2 + bx, y2 - by, x2, y1); // ↖
	},
}




export default function suit(suit, option={}) {
	if (!Object.keys(suits).includes(suit)) {
		console.error(`Unrecognized suit: ${suit}`);
		return false;
	}
	option = {
		color: option.color || (suit == 'heart'||suit == 'diamond' ? 'red' : 'black'),
		fill : option.fill  || true,
		size : option.size  || 100,
	};

	let canvas = document.createElement('canvas');
	canvas.width = option.size;
	canvas.height = option.size;
	let ctx = canvas.getContext('2d');

	let w = option.size;
	let h = option.size;

	ctx.strokeStyle = option.color;
	ctx.fillStyle = option.color;

	suits[suit](w,h,ctx);

	if (option.fill) ctx.fill();
	else ctx.stroke();

	return canvas;
}

export let reverse = function (origin,hor=false,ver=true) {
	let canvas = document.createElement('canvas');
	let w = origin.width;
	let h = origin.height;
	canvas.width = w;
	canvas.height = h;
	let ctx = canvas.getContext('2d');

	let tx = hor ? w : 0;
	let ty = ver ? h : 0;
	ctx.translate(tx, ty);

	let sx = hor ? -1 : 1;
	let sy = ver ? -1 : 1;
	ctx.scale(sx,sy);
	ctx.drawImage(origin,0,0);

	return canvas;
}


/*
// 黑桃
let spade = function (color='black', fill=true) {
	if (typeof color!=='string') {
		[color, fill] = ['black',Boolean(color)];
	}
	// 由于是先写的梅花再写的黑桃，因此数值有点奇怪
	let canvas = document.createElement('canvas');
	canvas.width = 100;
	canvas.height = 100;
	let ctx = canvas.getContext('2d');

	let x = 0;
	let y = 0;
	let w = 100;
	let h = 100;

	let p1 = {x:x+w*80/170,  y:y+h*120/170}; // 头部
	let p2 = {x:x+w/2,       y:y};
	let p3 = {x:x+w*90/170,  y:y+h*120/170};

	let bx1 = w*.8; // 三次贝塞尔曲线控制点x的偏移值
	let bx2 = w*.4;

	let by1 = y+h*.3; // 三次贝塞尔曲线控制点y的值
	let by2 = y+h*1.1;

	let Root = y + h;

	ctx.strokeStyle = color;
	ctx.fillStyle = color;

	ctx.beginPath();
	// 头部
	ctx.moveTo(p1.x,p1.y);
	ctx.bezierCurveTo(
		p1.x-bx2, by2,
		p1.x-bx1, by1,
		p2.x, p2.y);
	ctx.bezierCurveTo(
		p3.x+bx1, by1,
		p3.x+bx2, by2,
		p3.x, p3.y);
	// 根部
	ctx.quadraticCurveTo(p3.x, Root, x+w*130/170, Root);
	ctx.lineTo(x+w*40/170, Root);
	ctx.quadraticCurveTo(p1.x, Root, p1.x, p1.y);

	if (fill) ctx.fill();
	else ctx.stroke();

	return canvas;
}

// 红桃
let heart = function (color='red', fill=true) {
	if (typeof color!=='string') {
		[color, fill] = ['red',Boolean(color)];
	}
	let canvas = document.createElement('canvas');
	canvas.width = 100;
	canvas.height = 100;
	let ctx = canvas.getContext('2d');

	let x = 0;
	let y = 0;
	let w = 100;
	let h = 100;

	let s = {x:x+w/2, y:y+h/5};	// 上方凹下去的点
	let e = {x:x+w/2, y:y+h};	// 下方凸出来的点

	let bx1 = w*35/150;		// 三次贝塞尔曲线控制点x的偏移值
	let bx2 = w*149/150;

	let by1 = y-h*50/150;	// 三次贝塞尔曲线控制点y的值
	let by2 = y+h/3;

	ctx.strokeStyle = color;
	ctx.fillStyle = color;

	ctx.beginPath();
	ctx.moveTo(s.x,s.y);
	ctx.bezierCurveTo(s.x+bx1, by1, s.x+bx2, by2, e.x,e.y);
	ctx.bezierCurveTo(s.x-bx2, by2, s.x-bx1, by1, s.x,s.y);

	if (fill) ctx.fill();
	else ctx.stroke();

	return canvas;
}

// 梅花
let club = function (color='black', fill=true) {
	if (typeof color!=='string') {
		[color, fill] = ['black',Boolean(color)];
	}
	let canvas = document.createElement('canvas');
	canvas.width = 100;
	canvas.height = 100;
	let ctx = canvas.getContext('2d');

	let x = 0;
	let y = 0;
	let w = 100;
	let h = 100;

	let r = w*(40/170);

	let p1 = {x:x+r, y:y+w*(105/170)};
	let p2 = {x:x+w/2, y:y+r};
	let p3 = {x:x+w-r, y:y+w*(105/170)};

	let Root = y + h;

	// 头部
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(p1.x, p1.y, r, 0,                 315*Math.PI/180);
	ctx.arc(p2.x, p2.y, r, 112.5*Math.PI/180, 67.5*Math.PI/180);
	ctx.arc(p3.x, p3.y, r, 225*Math.PI/180,   180*Math.PI/180);
	// 根部
	ctx.quadraticCurveTo(p3.x-r, Root, p3.x, Root);
	ctx.lineTo(p1.x,Root);
	ctx.quadraticCurveTo(p1.x+r,Root,p1.x+r,p1.y);

	if (fill) ctx.fill();
	else ctx.stroke();

	return canvas;
}

// 方块
let diamond = function (color='red', fill=true) {
	if (typeof color!=='string') {
		[color, fill] = ['red',Boolean(color)];
	}
	let canvas = document.createElement('canvas');
	canvas.width = 100;
	canvas.height = 100;
	let ctx = canvas.getContext('2d');

	let x = 0;
	let y = 0;
	let w = 100;
	let h = 100;

	let bx = w*.1;
	let by = h*.1;

	let x1 = x + w*.1; // 左
	let y1 = y + h*0; // 上
	let x2 = x + w*.5; // 中
	let y2 = y + h*.5; // 中
	let x3 = x + w*.9; // 右
	let y3 = y + h*1; // 下


	ctx.beginPath();
	ctx.moveTo(x2,y1);
	ctx.quadraticCurveTo(x2 - bx, y2 - by, x1, y2); // ↙
	ctx.quadraticCurveTo(x2 - bx, y2 + by, x2, y3); // ↘
	ctx.quadraticCurveTo(x2 + bx, y2 + by, x3, y2); // ↗
	ctx.quadraticCurveTo(x2 + bx, y2 - by, x2, y1); // ↖

	ctx.strokeStyle = color;
	ctx.fillStyle = color;

	if (fill) ctx.fill();
	else ctx.stroke();

	return canvas;
}
*/