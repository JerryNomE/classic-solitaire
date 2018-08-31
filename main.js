import Deck from './js/poker/Deck';
import card from './js/poker/UI/card';
import ifWithin from './js/public/ifWithin';
import new_canvas from './js/canvases/public/new_canvas';
import {canvas as CANVAS_SIZE} from './js/canvases/public/config';
import Canvas_bg from './js/canvases/bg';

// 设定大小
const CANVAS = document.getElementById('canvas');


/** 逻辑 **/
let deck = new Deck({reversed:false}).shuffle();
let deck_columns = Array.from({length:7},(v,i)=>deck.splice(0,i+1));
let deck_candidate = deck;
let deck_sorting = new Array(4);

let candidate = 0;

deck_columns.forEach((v)=>{v[v.length-1].reversed = true});

/** 画背景 **/
let ctx_bg = new Canvas_bg(CANVAS);

/** 卡牌区 **/


/** 操作区 **/

/** 操作 **/