import {canvas as CANVAS_SIZE} from '../canvases/public/config';
import ifWithin from '../public/ifWithin'；

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

let handler = (e)=>{
	mouse = inCanvas(e.clientX, e.clientY);
	let n;
	if (!mouse) {return}
	let {x,y} = mouse;

	if(ifWithin([x,zone_candidate.l,zone_candidate.r], [y,zone_candidate.t,zone_candidate.b])){
		console.log('next_candidates');
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
}

class solitaire_events{
	constructor(dom){
		set_canvasSize(dom);
		window.addEventListener('resize',()=>{
			set_canvasSize(dom);
			this.locate(dom);
		});
		this.dom = dom;
	}

	init(){
		this.locate(this.dom);
	}

	locate(CANVAS){
		canvasPos = {
			left   : CANVAS.offsetLeft + Number(CANVAS.style.borderLeftWidth.slice(0,-2)),
			right  : CANVAS.offsetLeft + CANVAS.offsetWidth - Number(CANVAS.style.borderRightWidth.slice(0,-2)),
			top    : CANVAS.offsetTop + Number(CANVAS.style.borderTopWidth.slice(0,-2)),
			bottom : CANVAS.offsetTop + CANVAS.offsetHeight - Number(CANVAS.style.borderBottomWidth.slice(0,-2)),
		};
		Object.assign(canvasPos,{
			width : canvasPos.right - canvasPos.left,
			height : canvasPos.bottom - canvasPos.top,
		});
	}
}
