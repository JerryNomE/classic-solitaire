import UI_card from '../../poker/UI/card';
import getCenterPos from '../../public/getCenterPos';

const CANVAS_WIDTH  = 1024;
const CANVAS_HEIGHT = 768;

const card_width  = 100;
const card_height = Math.round(card_width / UI_card.get_w() * UI_card.get_h());

const secPosY = 250;


let canvas = {
	width  : CANVAS_WIDTH,
	height : CANVAS_HEIGHT,
};

let card = {
	width  : card_width,
	height : card_height,
	marginTop  : Math.round(card_height * 1 / 5),
	marginLeft : Math.round(card_width * 1 / 5),

	posX    : Array.from({length:7}, (v,i)=>Math.round((CANVAS_WIDTH-7*card_width)*(i+1)/8 + card_width*i)),
	secPosY,
	firPosY : Math.round(getCenterPos([card_height,secPosY,0])[0]),
};

export {canvas, card};