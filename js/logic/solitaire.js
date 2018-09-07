import {canvas as CANVAS_SIZE} from '../canvases/public/config';
import ifWithin from '../public/ifWithin';
import Deck from '../poker/Deck.js';
import Canvas_bg from '../canvases/bg.js';
import Canvas_cards from '../canvases/cards.js';
import Canvas_activeCard from '../canvases/activeCard.js';

// 逻辑相关
let logic = {
	deck_candidate : [], // 左上draw_pile
	candidate : 0, // 当前draw_pile翻到第几张卡
	deck_columns : [], // 下方7列卡
	deck_sorting : [], // 右上排序
};
const init_deck = ()=>{
	logic.deck_candidate = new Deck().shuffle();
	logic.deck_columns = Array.from({length:7}, (v,i)=>logic.deck_candidate.splice(0,i+1));
	logic.deck_sorting = new Array(4);
	logic.candidate = 0;
}

// 获取动画区域相关
let canvasPos;
let canvas_minWidth = 500;
const set_canvasSize = (dom)=>{
	if (window.innerWidth <= canvas_minWidth || window.innerHeight <= canvas_minWidth * CANVAS_SIZE.height/CANVAS_SIZE.width) {
		dom.style.width = `${canvas_minWidth}px`;
		dom.style.height = `${canvas_minWidth * CANVAS_SIZE.height/CANVAS_SIZE.width}px`;
	}
	else if (window.innerWidth/window.innerHeight > CANVAS_SIZE.width/CANVAS_SIZE.height) {
		dom.style.width = `${Math.round(window.innerHeight * CANVAS_SIZE.width/CANVAS_SIZE.height)}px`;
		dom.style.height = `${window.innerHeight}px`;
	}
	else {
		dom.style.width = `${window.innerWidth}px`;
		dom.style.height = `${Math.round(window.innerWidth * CANVAS_SIZE.height/CANVAS_SIZE.width)}px`;
	}
}

// 获取鼠标位置相关
let mouse;
const inCanvas = (x,y)=>{
	if (ifWithin([x, canvasPos.left, canvasPos.right], [y, canvasPos.top, canvasPos.bottom])) {
		return {
			x: Math.round((x-canvasPos.left)*CANVAS_SIZE.width/canvasPos.width),
			y: Math.round((y-canvasPos.top)*CANVAS_SIZE.height/canvasPos.height),
		}
	}
	else return false
}

const

// 初始化canvas
const stage = document.getElementById('stage');
let canvases = {};

// 鼠标动作相关
let handler = {
	/*
	mousedown:
	如果点击到了卡片：
	1、计算出选中卡的位置
	2、重绘cards
		a、candidate和columns的
			cards清空改卡到末尾的卡，重绘上一张卡
		b、sorting的
			cards直接重绘上一张卡
	3、active_card上同一位置画出该卡
	 */
	 mouseDown(x,y){
	 	1
	 }

	/*
	mousemove:
	监听鼠标移动，active_card移动同样距离（可以考虑靠边不能动的效果）
	 */

	/*
	mousedown:
	获取当前操作卡片的中心，如果落在最上层卡片，则判断为放在其上
	不符合放置规则或者没放到位置的在固定时间（暂定.2s）内回到位置（回到动画暂定在activeCard）
	 */

	/*
	dblclick:
	符不符合放置到排序区的规则，符合则放过去
	 */
}


// 类相关
export default class solitaire{
	constructor(stage){
		set_canvasSize(stage);
		window.addEventListener('resize',()=>{
			set_canvasSize(stage);
			this.locate(stage);
		});
		canvases = {
			bg         : new Canvas_bg(stage),
			cards      : new Canvas_cards(stage),
			activeCard : new Canvas_activeCard(stage),
		}
		this.stage = stage;
		this.init();
	}

	init(){
		init_deck();
		canvases.cards.set_logic(logic);
		canvases.cards.draw_all();
	}

	locate(STAGE){
		canvasPos = {
			left   : STAGE.offsetLeft + Number(STAGE.style.borderLeftWidth.slice(0,-2)),
			right  : STAGE.offsetLeft + STAGE.offsetWidth - Number(STAGE.style.borderRightWidth.slice(0,-2)),
			top    : STAGE.offsetTop + Number(STAGE.style.borderTopWidth.slice(0,-2)),
			bottom : STAGE.offsetTop + STAGE.offsetHeight - Number(STAGE.style.borderBottomWidth.slice(0,-2)),
		}
		Object.assign(canvasPos,{
			width  : canvasPos.right - canvasPos.left,
			height : canvasPos.bottom - canvasPos.top,
		});
	}
}
