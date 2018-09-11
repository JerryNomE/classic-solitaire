import {canvas as CANVAS_SIZE,card as CARD_SIZE} from '../canvases/public/config';
import ifWithin from '../public/ifWithin';
import Deck from '../poker/Deck.js';
import Canvas_bg from '../canvases/bg.js';
import Canvas_cards from '../canvases/cards.js';
import Canvas_activeCard from '../canvases/activeCard.js';
import {set_logic as zone_set_logic, zone_candidate, zone_shownCandidate, zone_columns, zone_sorting} from './public/zones';

let deck = new Deck();
zone_shownCandidate.r = zone_shownCandidate.R();
zone_columns.forEach((v)=>{v.b=v.B()});
// const _candidate = Symbol.for('candidate'), _columns = Symbol.for('columns');

// 逻辑相关
let logic = {
	deck_candidate : [], // 左上draw_pile
	candidate      : 0, // 当前draw_pile翻到第几张卡
	shownCards     : 3, // 当前显示多少张候选卡
	deck_columns   : [], // 下方7列卡
	deck_sorting   : [], // 右上排序
};
const init_deck = ()=>{
	logic.deck_candidate = deck.shuffle();
	logic.deck_columns   = Array.from({length:7}, (v,i)=>logic.deck_candidate.splice(0,i+1));
	logic.deck_sorting   = new Array(4);
	logic.candidate      = 0;
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
			x: Math.round((x - canvasPos.left) * CANVAS_SIZE.width / canvasPos.width),
			y: Math.round((y - canvasPos.top) * CANVAS_SIZE.height / canvasPos.height),
		}
	}
	else return false
}

let space = (CANVAS_SIZE.width - CARD_SIZE.width)/8;
let cardNspace = CARD_SIZE.width + space;
const inZone = ({x,y})=>{
	if (ifWithin([y, CARD_SIZE.firPosY, CARD_SIZE.firPosY + CARD_SIZE.height])) {
		if (ifWithin([x, zone_candidate.l, zone_candidate.r])) return {
			zone : 'candidate'
		}

		if (ifWithin([x, zone_shownCandidate.l, zone_shownCandidate.r])) {
			if (logic.shownCards < 2) return {
				zone  : 'shown',
				Cindex : 0,
			}
			else if ([x, zone_candidate.r - CARD_SIZE.width, zone_candidate.r]) return {
				zone  : 'shown',
				Cindex : logic.shownCards - 1,
			}
			else return {
				zone  : 'shown',
				Cindex : Math.floor((x - zone_shownCandidate.l) / CARD_SIZE.marginLeft),
			}
		}

		if (x%cardNspace>space && x/cardNspace>2) {
			return {
				zone  : 'sorting',
				Zindex : Math.floor(x/cardNspace)-3,
			}
		}
	}

	else if (x%cardNspace>space) {
		let Zindex = Math.floor(x/cardNspace);
		if (ifWithin([y, zone_columns[index].t, zone_columns[index].b])) {
			if (ifWithin([y, zone_columns[index].b - CARD_SIZE.height, zone_columns[index].b]))
				return {
					zone   : 'column',
					Zindex ,
					Cindex : logic.deck_columns[index].length - 1,
				}
			else return {
				zone   : 'column',
				Zindex ,
				Cindex : Math.floor((y - zone_shownCandidate.t) / CARD_SIZE.marginTop),
			}
		}
	}

	else return null;
}

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
		if (mouse = inCanvas()) {
			if (mouse = inZone(mouse)) {
				if (mouse.zone=='candidate') {
					nextCandidate();
				}
				else if (mouse.zone=='shown') {
					let activeCards = logic.deck_candidate.slice(mouse.Cindex, mouse.Cindex+1);
					if (mouse.Cindex==logic.shownCards - 1) {
						logic.shownCards -= 1;
						canvases.cards.draw_shownCandidate(false);
						canvases.activeCard.setImage(activeCards);
						// 添加mousemove的listener
					}
					else {
						canvases.activeCard.setImage(activeCards);
					}
				}
			}
		}
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
		zone_set_logic(logic);
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
