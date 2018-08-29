import Deck from './js/Deck.js';
import card from './js/UI/card.js';
import getCenterPos from './js/public/getCenterPos';
import ifWithin from './js/public/ifWithin';

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

const card_back = card.cards.back();

// 设定大小
const CANVAS = document.getElementById('canvas');
const set_canvasSize = ()=>{
	if (window.innerWidth <= 500 || window.innerHeight <= 500 * CANVAS_HEIGHT/CANVAS_WIDTH) {
		canvas.style.width = `${500}px`;
		canvas.style.height = `${500 * CANVAS_HEIGHT/CANVAS_WIDTH}px`;
	}
	else if (window.innerWidth/window.innerHeight > CANVAS_WIDTH/CANVAS_HEIGHT) {
		canvas.style.width = `${Math.round(window.innerHeight * CANVAS_WIDTH/CANVAS_HEIGHT)}px`;
		canvas.style.height = `${window.innerHeight}px`;
	}
	else {
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${Math.round(window.innerWidth * CANVAS_HEIGHT/CANVAS_WIDTH)}px`;
	}
}
set_canvasSize();
window.addEventListener('resize',()=>{set_canvasSize()})

/**
 * 新增图层
 * @return {context} 图层的2D context
 */
const new_canvas = () => {
	let canvas = document.createElement('canvas');
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	CANVAS.appendChild(canvas);

	return canvas.getContext('2d');
}

/** 逻辑 **/
let deck = new Deck({reversed:false}).shuffle();
let deck_columns = Array.from({length:7},(v,i)=>deck.splice(0,i+1));
let deck_candidate = deck;
let deck_sorting = new Array(4);

let candidate = 0;

deck_columns.forEach((v)=>{v[v.length-1].reversed = true});
let card_width = 100;
let card_height = Math.round(card_width / 140 * 200);
let card_marginTop = Math.round(card_height * 1 / 5);
let card_marginLeft = Math.round(card_width * 1 / 5);

let posX = Array.from({length:7}, (v,i)=>Math.round((CANVAS_WIDTH-7*card_width)*(i+1)/8 + card_width*i));
let secPosY = 250;
let firPosY = Math.round(getCenterPos([card_height,secPosY,0])[0]);

let zone_candidate = {
	l: posX[0],
	r: posX[0] + card_width,
	t: firPosY,
	b: firPosY + card_height,
};

let zone_shownCandidate = {
	l: posX[1],
	r(){
		let n = candidate>2 ? 2 : 1;
		return candidate == 0 ? posX[1] : posX[1]+card_width+card_marginLeft*n;
	},
	t: firPosY,
	b: firPosY + card_height,
};

let zone_columns = Array.from({length:7}, (v,i)=>({
	l: posX[i],
	r: posX[i] + card_width,
	t: secPosY,
	b(){
		let n = deck_columns[i].length;
		n = n == 0 ? 0 : n-1;
		return secPosY + card_marginTop * n + card_height;
	}
}));

let zone_sorting = Array.from({length:4}, (v,i)=>({
	l: posX[i+3],
	r: posX[i+3] + card_width,
	t: firPosY,
	b: firPosY + card_height,
}));

/** 画背景 **/
let ctx_bg = new_canvas();

(()=>{
	let canvas_bg_proto = document.createElement('canvas');
	let canvas_bg_proto_size = 100;
	let canvas_bg_proto_color1 = 'lime';
	let canvas_bg_proto_color2 = '#00dd00';
	canvas_bg_proto.width = canvas_bg_proto_size;
	canvas_bg_proto.height = canvas_bg_proto_size;
	let ctx_bg_proto = canvas_bg_proto.getContext('2d');
	ctx_bg_proto.fillStyle = canvas_bg_proto_color1;
	ctx_bg_proto.fillRect(0,0,canvas_bg_proto_size,canvas_bg_proto_size);
	ctx_bg_proto.fillStyle = canvas_bg_proto_color2;
	ctx_bg_proto.beginPath();
	ctx_bg_proto.moveTo(canvas_bg_proto_size/2,0);
	ctx_bg_proto.lineTo(0,canvas_bg_proto_size/2);
	ctx_bg_proto.lineTo(0,canvas_bg_proto_size);
	ctx_bg_proto.lineTo(canvas_bg_proto_size,0);
	ctx_bg_proto.fill();
	ctx_bg_proto.beginPath();
	ctx_bg_proto.moveTo(canvas_bg_proto_size/2,canvas_bg_proto_size);
	ctx_bg_proto.lineTo(canvas_bg_proto_size,canvas_bg_proto_size);
	ctx_bg_proto.lineTo(canvas_bg_proto_size,canvas_bg_proto_size/2);
	ctx_bg_proto.fill();

	let bg = ctx_bg.createPattern(canvas_bg_proto,'repeat');
	ctx_bg.fillStyle = bg;
	ctx_bg.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	ctx_bg.drawImage(card.cards.border,
		posX[0],firPosY,card_width,card_height);
	ctx_bg.drawImage(card.cards.border,
		posX[3],firPosY,card_width,card_height);
	ctx_bg.drawImage(card.cards.border,
		posX[4],firPosY,card_width,card_height);
	ctx_bg.drawImage(card.cards.border,
		posX[5],firPosY,card_width,card_height);
	ctx_bg.drawImage(card.cards.border,
		posX[6],firPosY,card_width,card_height);


	ctx_bg.drawImage(card.cards.border,
		posX[0],secPosY,card_width,card_height);
	ctx_bg.drawImage(card.cards.border,
		posX[1],secPosY,card_width,card_height);
	ctx_bg.drawImage(card.cards.border,
		posX[2],secPosY,card_width,card_height);
	ctx_bg.drawImage(card.cards.border,
		posX[3],secPosY,card_width,card_height);
	ctx_bg.drawImage(card.cards.border,
		posX[4],secPosY,card_width,card_height);
	ctx_bg.drawImage(card.cards.border,
		posX[5],secPosY,card_width,card_height);
	ctx_bg.drawImage(card.cards.border,
		posX[6],secPosY,card_width,card_height);
})();

/** 卡牌区 **/
let ctx_cards = new_canvas();
if (candidate != deck_candidate.length-1) {
	ctx_cards.drawImage(card_back,posX[0],firPosY,card_width,card_height);
}
deck_columns.forEach((v,i)=>{
	v.forEach((c,j)=>{
		ctx_cards.drawImage((c.reversed?c.image:card_back), posX[i],secPosY+card_marginTop*j,card_width,card_height);
	});
});

const drawCandidate = ()=>{
	if (candidate == 0) {return}
	let s;
	let e;
	if (candidate<3) {s=0;e=candidate;}
	else {s=candidate-3;e=candidate;}
	deck_candidate.slice(s,e).forEach((v,i)=>{
		ctx_cards.drawImage(v.image, posX[1]+card_marginLeft*i, firPosY,card_width,card_height);
	});
}
drawCandidate();

/** 排序区 **/

/** 操作 **/
let canvasPos = {
	left : CANVAS.offsetLeft + Number(CANVAS.style.borderLeftWidth.slice(0,-2)),
	right : CANVAS.offsetLeft + CANVAS.offsetWidth - Number(CANVAS.style.borderRightWidth.slice(0,-2)),
	top : CANVAS.offsetTop + Number(CANVAS.style.borderTopWidth.slice(0,-2)),
	bottom : CANVAS.offsetTop + CANVAS.offsetHeight - Number(CANVAS.style.borderBottomWidth.slice(0,-2)),
};
Object.assign(canvasPos,{
	width : canvasPos.right - canvasPos.left,
	height : canvasPos.bottom - canvasPos.top,
});

const inCanvas = (x,y)=>{
	if (x > canvasPos.left &&
		x < canvasPos.right &&
		y > canvasPos.top &&
		y < canvasPos.bottom) {
		return {
			x: Math.round((x-canvasPos.left)*CANVAS_WIDTH/canvasPos.width), 
			y: Math.round((y-canvasPos.top)*CANVAS_HEIGHT/canvasPos.height),
		}
	}
	else return false
}

let mouse;
window.addEventListener('mousedown',(e)=>{
	mouse = inCanvas(e.clientX, e.clientY);
	let n;
	if (!mouse) {return}
	let {x,y} = mouse;

	if(ifWithin([x,zone_candidate.l,zone_candidate.r], [y,zone_candidate.t,zone_candidate.b])){
		console.log('next_candidates')
	}
	else if(ifWithin([x,zone_shownCandidate.l,zone_shownCandidate.r()], [y,zone_shownCandidate.t,zone_shownCandidate.b])){
		console.log('zone_shownCandidate');
	}
	else if((n = zone_columns.findIndex((v)=>{
			return ifWithin([x,v.l,v.r], [y,v.t,v.b()]);
		})) != -1){
		console.log(`zone_columns${n}`);
	}
	else if((n = zone_sorting.findIndex((v)=>{
			return ifWithin([x,v.l,v.r], [y,v.t,v.b]);
		})) != -1){
		console.log(`zone_sorting${n}`);
	}
});