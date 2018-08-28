import Deck from './js/Deck.js';
import card from './js/UI/card.js';
import getCenterPos from './js/public/getCenterPos';

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

// 设定大小
const CANVAS = document.getElementById('canvas');
canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`;

const new_canvas = () => {
	let canvas = document.createElement('canvas');
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	CANVAS.appendChild(canvas);

	return canvas.getContext('2d');
}


/** 画背景 **/
let ctx_bg = new_canvas();

let card_width = 100;
let card_height = card_width / 140 * 200;

let posX = Array.from({length:7}, (v,i)=>Math.round((CANVAS_WIDTH-7*card_width)*(i+1)/8 + card_width*i));
let secPosY = 250;
let firPosY = getCenterPos([card_height,secPosY,0]);

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

// ctx_bg.drawImage(card.cards.back(),posX[0],firPosY,card_width,card_height);

/** 邏輯 **/
let deck = new Deck({reversed:false}).shuffle();
let deck_columns = Array.from({length:7},(v,i)=>deck.splice(0,i+1));
let deck_candidate = deck;
let deck_sorting = new Array(4);

let candidate = 0;

deck_columns.forEach((v)=>{v[v.length-1].reversed = true});

/** 卡牌区 **/
let ctx_cards = new_canvas();
