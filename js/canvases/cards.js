import new_canvas from './public/new_canvas';
import {zone_candidate, zone_shownCandidate, zone_columns, zone_sorting} from './public/zones';
import {canvas as canvas_size, card as card_size} from './public/config';
import x from '../poker/UI/card';

let UI_cards = x.cards;
let get_w = x.get_w;
let get_h = x.get_h;

let card_back = UI_cards.back();
let solitare;
let deck_columns, deck_candidate, deck_sorting;
let ctx;
let shownCards = 3;
export default class{
	constructor(parent){
		this.ctx = new_canvas(parent);
		ctx = this.ctx;
	};


return_shownCandidate(){
	cabdu
}
	set_logic(logic){
		solitare = logic;
		deck_columns   = solitare.deck_columns;
		deck_candidate = solitare.deck_candidate;
		deck_sorting   = solitare.deck_sorting;
	}
	// 初始化时把卡牌画出来
	draw_all(){
		deck_columns.forEach((v,i)=>{
			this.draw_column(i);
		});
		this.draw_candidate();
	};

	/**
	 * 绘制下方7列卡牌
	 * @param  {int}  i [第n列]
	 * @param  {int}  s [第n张牌开始，默认第一张]
	 * @param  {Boolean} e [第n+1张牌结束，默认到结尾]
	 */
	draw_column(i, s=0, e=false){
		let cur = deck_columns[i];
		e = e || cur.length;
		cur.slice(s,e).forEach((c,k)=>{
			ctx.drawImage((c.reversed?c.image:card_back),
				zone_columns[i].l,
				card_size.secPosY+card_size.marginTop*k,
				card_size.width,
				card_size.height);
		});
	};
	/**
	 * 清除下方7列卡牌
	 * @param  {int}  i [第n列]
	 * @param  {int}  s [第n张牌开始，默认第一张]
	 * @param  {Boolean} e [第n+1张牌结束，默认到结尾]
	 */
	clear_column(i, s=0, e=false){
		e = e || cur.length-1;
		cur.clearRect(zone_columns[i].l,
			card_size.secPosY+card_size.marginTop*s,
			card_size.width,
			card_size.height+card_size.marginTop*(e-s));
	};
	/**
	 * 重绘下方7列卡牌，从第s张卡牌开始清除
	 * @param  {int}  i [第n列]
	 * @param  {int}  s [第n张牌开始清除]
	 */
	cut_column(i, j){
		let cur = deck_columns[i];
		this.clear_column(i, j);
		this.draw_column(i, j, j+1);
	};

	/**
	 * 绘制左上卡组卡背。
	 * 如果现在候选卡数是卡组长度，清除卡背；
	 * 如果现在候选卡数为0，画卡背；
	 */
	draw_candidate(){
		let candidate = solitare.candidate;
		if(candidate == deck_candidate.length)this.clear_candidate();
		else if (candidate == 0) {
			ctx.drawImage(card_back,
				zone_candidate.l, zone_candidate.t,
				card_size.width, card_size.height);
		}
	};
	clear_candidate(){
		ctx.clearRect(card_size.posX[0], card_size.firPosY,
			card_size.width, card_size.height);
	};

	/**
	 * 画翻出来的候选卡
	 * @param  {Boolean} nextSet [description]
	 */
	draw_shownCandidate(nextSet = true){
		if (candidate == 0) {return}
		if (nextSet) {shownCards = 3 }
		let sc = shownCards==0 ? 1 : shownCards;
		let s = candidate<3 ? 0 : candidate-sc;
		let e = candidate;
		deck_candidate.slice(s,e).forEach((v,i)=>{
			ctx.drawImage(v.image, card_size.posX[1]+card_marginLeft*i, card_size.firPosY,card_size.width,card_size.height);
		});
	}

	move_shownCandidate    () {shownCards -= 1; draw_shownCandidate(false)}
	return_shownCandidate  () {shownCards += 1; draw_shownCandidate(false)}
	confirm_shownCandidate () {shownCards >= 1 ? shownCards : 1; draw_shownCandidate(false)}
}