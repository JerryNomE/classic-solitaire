import get_suitImg from './suit.js';
import {reverse} from './suit.js';
import mustache from './mustache.js';
import crown1 from './crown1.js';
import crown2 from './crown2.js';

let w = 140;
let h = 200;

const ACESIZE = 75;
const SUITSIZE = 25;

const LEFT_SUIT = (w-SUITSIZE*2)*1/3;
const MID_SUIT  = (w-SUITSIZE)/2;
const RIGHT_SUIT = w - LEFT_SUIT - SUITSIZE;

let border = (function () {
	let r = 20;

	let canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	let ctx = canvas.getContext('2d');
	ctx.fillStyle = 'white';
	ctx.lineWidth = 2;

	ctx.beginPath();
	ctx.moveTo(r,0);
	ctx.lineTo(w-r,0);
	ctx.quadraticCurveTo(w,0,w,r);
	ctx.lineTo(w,h-r);
	ctx.quadraticCurveTo(w,h,w-r,h);
	ctx.lineTo(r,h);
	ctx.quadraticCurveTo(0,h,0,h-r);
	ctx.lineTo(0,r);
	ctx.quadraticCurveTo(0,0,r,0);

	ctx.fill();
	ctx.stroke();

	return canvas;
})();

let thickBorder = (function () {
	let r = 20;

	let canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	let ctx = canvas.getContext('2d');
	ctx.lineWidth = 3;

	ctx.beginPath();
	ctx.moveTo(r,0);
	ctx.lineTo(w-r,0);
	ctx.quadraticCurveTo(w,0,w,r);
	ctx.lineTo(w,h-r);
	ctx.quadraticCurveTo(w,h,w-r,h);
	ctx.lineTo(r,h);
	ctx.quadraticCurveTo(0,h,0,h-r);
	ctx.lineTo(0,r);
	ctx.quadraticCurveTo(0,0,r,0);

	ctx.stroke();

	return canvas;
})();

const shape = {
	spade:get_suitImg('spade'),
	heart:get_suitImg('heart'),
	club: get_suitImg('club'),
	diamond:get_suitImg('diamond'),
}

const drawSide = (ctx,str,suit)=>{
	let suitSize = 15;
	let paddingh = 8;
	let paddingv = 10;
	let fz = 18;
	let to_suit = 18;

	// 左上
	ctx.font = `${fz}px Courier New bolder`;
	ctx.drawImage(suit,paddingh,paddingv,suitSize,suitSize);
	ctx.fillText(str,
		paddingh+(suitSize-ctx.measureText(str).width)/2-1,
		paddingv+suitSize+to_suit);

	// 右下
	ctx.save();
	ctx.translate(w,h);
	ctx.rotate(Math.PI);
	ctx.drawImage(suit,paddingh,paddingv,suitSize,suitSize);
	ctx.fillText(str,
		paddingh+(suitSize-ctx.measureText(str).width)/2,
		paddingv+suitSize+to_suit);
	ctx.restore();
}

const drawTwo = (ctx,x,suit)=>{
	ctx.drawImage(suit,x,(h-SUITSIZE*2)/3,SUITSIZE,SUITSIZE);
	ctx.drawImage(reverse(suit),x,(h-SUITSIZE*2)*2/3+SUITSIZE,SUITSIZE,SUITSIZE);
}

const drawThree = (ctx,x,suit)=>{
	ctx.drawImage(suit,x,(h-SUITSIZE*3)*1/4,SUITSIZE,SUITSIZE);
	ctx.drawImage(suit,x,(h-SUITSIZE*3)*2/4+SUITSIZE,SUITSIZE,SUITSIZE);
	ctx.drawImage(reverse(suit),x,(h-SUITSIZE*3)*3/4+SUITSIZE*2,SUITSIZE,SUITSIZE);
}

const drawFour = (ctx,x,suit)=>{
	ctx.drawImage(suit,x,(h-SUITSIZE*4)*1/5,SUITSIZE,SUITSIZE);
	ctx.drawImage(suit,x,(h-SUITSIZE*4)*2/5+SUITSIZE,SUITSIZE,SUITSIZE);
	ctx.drawImage(reverse(suit),x,(h-SUITSIZE*4)*3/5+SUITSIZE*2,SUITSIZE,SUITSIZE);
	ctx.drawImage(reverse(suit),x,(h-SUITSIZE*4)*4/5+SUITSIZE*3,SUITSIZE,SUITSIZE);
}

const newContext = (suit)=>{
	if (!Object.keys(shape).includes(suit)) {
		console.error(`Unrecognized suit: ${suit}`);
		return false;
	}
	let canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	let ctx = canvas.getContext('2d');

	if (suit == 'spade' || suit == 'club') ctx.fillStyle = 'black';
	else ctx.fillStyle = 'red';
	let cur_suit = shape[suit];

	ctx.drawImage(border,0,0);

	return [ctx,cur_suit];
}



let cards = {
	border: thickBorder,
	ace(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'A',cur_suit);

		// 中间
		ctx.drawImage(cur_suit,(w-ACESIZE)/2,(h-ACESIZE)/2,ACESIZE,ACESIZE);

		return ctx.canvas;
	},

	two(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'2',cur_suit);

		// 中间
		drawTwo(ctx,(w-SUITSIZE)/2,cur_suit);

		return ctx.canvas;
	},

	three(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'3',cur_suit);

		// 中间
		drawThree(ctx,(w-SUITSIZE)/2,cur_suit);

		return ctx.canvas;
	},

	four(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'4',cur_suit);

		// 中间
		drawTwo(ctx,LEFT_SUIT,cur_suit);
		drawTwo(ctx,RIGHT_SUIT,cur_suit);

		return ctx.canvas;
	},

	five(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'5',cur_suit);

		// 中间
		drawTwo(ctx,LEFT_SUIT,cur_suit);
		ctx.drawImage(cur_suit,MID_SUIT,(h-SUITSIZE)/2,SUITSIZE,SUITSIZE);
		drawTwo(ctx,RIGHT_SUIT,cur_suit);

		return ctx.canvas;
	},

	six(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'6',cur_suit);

		// 中间
		drawThree(ctx,LEFT_SUIT,cur_suit);
		drawThree(ctx,RIGHT_SUIT,cur_suit);

		return ctx.canvas;
	},

	seven(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'7',cur_suit);

		// 中间
		drawThree(ctx,LEFT_SUIT,cur_suit);
		ctx.drawImage(cur_suit,MID_SUIT,(h-SUITSIZE*2)*2/5,SUITSIZE,SUITSIZE);
		drawThree(ctx,RIGHT_SUIT,cur_suit);

		return ctx.canvas;
	},

	eight(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'8',cur_suit);

		// 中间
		drawThree(ctx,LEFT_SUIT,cur_suit);
		ctx.drawImage(cur_suit,MID_SUIT,(h-SUITSIZE*2)*2/5,SUITSIZE,SUITSIZE);
		ctx.drawImage(reverse(cur_suit),MID_SUIT,(h-SUITSIZE*2)*3/5+SUITSIZE,SUITSIZE,SUITSIZE);
		drawThree(ctx,RIGHT_SUIT,cur_suit);

		return ctx.canvas;
	},

	nine(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'9',cur_suit);

		// 中间
		drawFour(ctx,LEFT_SUIT,cur_suit);
		ctx.drawImage(cur_suit,MID_SUIT,(h-SUITSIZE)/2,SUITSIZE,SUITSIZE);
		drawFour(ctx,RIGHT_SUIT,cur_suit);

		return ctx.canvas;
	},

	ten(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'10',cur_suit);

		// 中间
		drawFour(ctx,LEFT_SUIT,cur_suit);
		ctx.drawImage(cur_suit,MID_SUIT,(h-SUITSIZE*2)*2/7,SUITSIZE,SUITSIZE);
		ctx.drawImage(reverse(cur_suit),MID_SUIT,(h-SUITSIZE*2)*5/7+SUITSIZE,SUITSIZE,SUITSIZE);
		drawFour(ctx,RIGHT_SUIT,cur_suit);

		return ctx.canvas;
	},

	jack(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'J',cur_suit);

		let color = suit == 'spade' ? 'black' :
				suit == 'heart' ? 'brown' :
				suit == 'club' ? 'chocolate' : 'orange';
		ctx.drawImage(mustache({color}),20,85,100,40);

		return ctx.canvas;
	},

	queen(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'Q',cur_suit);

		ctx.drawImage(crown2(),20,20,100,100);
		ctx.drawImage(shape[suit],62,79,16,16);

		return ctx.canvas;
	},

	king(suit) {
		let [ctx,cur_suit] = newContext(suit);

		drawSide(ctx,'K',cur_suit);

		ctx.drawImage(crown1(),20,80,100,70);
		ctx.drawImage(shape[suit],60,70,20,20);

		return ctx.canvas;
	},

	joker(red=true){ // true大鬼 false小鬼
		let paddingh = 8;
		let paddingv = 10;
		let fz = 15;
		let sapce = 0;

		let [ctx] = newContext('spade');
		ctx.font = `${fz}px Courier New`;
		ctx.fillStyle = red ? 'red' : 'black';

		ctx.fillText('J',paddingh,fz+paddingv+(fz+sapce)*0);
		ctx.fillText('O',paddingh,fz+paddingv+(fz+sapce)*1);
		ctx.fillText('K',paddingh,fz+paddingv+(fz+sapce)*2);
		ctx.fillText('E',paddingh,fz+paddingv+(fz+sapce)*3);
		ctx.fillText('R',paddingh,fz+paddingv+(fz+sapce)*4);

		ctx.save();
		ctx.translate(w,h);
		ctx.scale(-1,-1);
		ctx.fillText('J',paddingh,fz+paddingv+(fz+sapce)*0);
		ctx.fillText('O',paddingh,fz+paddingv+(fz+sapce)*1);
		ctx.fillText('K',paddingh,fz+paddingv+(fz+sapce)*2);
		ctx.fillText('E',paddingh,fz+paddingv+(fz+sapce)*3);
		ctx.fillText('R',paddingh,fz+paddingv+(fz+sapce)*4);
		ctx.restore();

		ctx.lineWidth = 15;
		ctx.lineCap="round";
		ctx.strokeStyle = red ? 'red' : 'grey';
		ctx.moveTo(w*2/10,h/2);
		ctx.quadraticCurveTo(w/2,h*2/3,w*8/10,h/2);
		ctx.stroke();

		ctx.lineWidth = 2;;
		ctx.strokeStyle = 'black';
		ctx.moveTo(200,200);
		ctx.quadraticCurveTo(250,250,300,200);
		ctx.stroke();

		return ctx.canvas;
	},

	back(){
		let r = 20;

		let canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		let ctx = canvas.getContext('2d');

		let tempCanvas = document.createElement('canvas');
		tempCanvas.width = 40;
		tempCanvas.height = 40;
		let temp = tempCanvas.getContext('2d');

		temp.fillStyle = '#f33';
		temp.fillRect(0,0,40,40);

		temp.fillStyle = '#c00';
		temp.beginPath();
		temp.moveTo(10,0);
		temp.lineTo(20,10);
		temp.lineTo(30,0);
		temp.lineTo(40,0);
		temp.lineTo(40,10);
		temp.lineTo(30,20);
		temp.lineTo(40,30);
		temp.lineTo(40,40);
		temp.lineTo(30,40);
		temp.lineTo(20,30);
		temp.lineTo(10,40);
		temp.lineTo(0,40);
		temp.lineTo(0,30);
		temp.lineTo(10,20);
		temp.lineTo(0,10);
		temp.lineTo(0,0);
		temp.fill();

		ctx.fillStyle = ctx.createPattern(tempCanvas,'repeat');

		ctx.beginPath();
		ctx.moveTo(r,0);
		ctx.lineTo(w-r,0);
		ctx.quadraticCurveTo(w,0,w,r);
		ctx.lineTo(w,h-r);
		ctx.quadraticCurveTo(w,h,w-r,h);
		ctx.lineTo(r,h);
		ctx.quadraticCurveTo(0,h,0,h-r);
		ctx.lineTo(0,r);
		ctx.quadraticCurveTo(0,0,r,0);

		ctx.fill();
		ctx.stroke();

		return canvas;
	},
}

let set_w = (nw)=>w=nw||140;
let set_h = (nh)=>h=nh||w*200/140;
let get_w = ()=>w;
let get_h = ()=>h;

export default {cards, set_w, set_h, get_w, get_h}