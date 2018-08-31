import new_canvas from './public/new_canvas';
import {zone_candidate, zone_shownCandidate, zone_columns, zone_sorting} from './public/zones';
import {canvas as canvas_size, card as card_size} from './public/config';
import {cards as UI_card, get_w, get_h} from '../poker/UI/card';

let card_back = UI_card.cards.back();
let solitare;
let deck_columns, deck_candidate, deck_sorting;

export default class{
	constructor(parent, logic){
		this.ctx = new_canvas(parent);
		solitare = logic;
		deck_columns   = solitare.deck_columns;
		deck_candidate = solitare.deck_candidate;
		deck_sorting   = solitare.deck_sorting;
		this.init();
	};
	init(){
		deck_columns.forEach((v,i)=>{
			this.draw_column(i);
		});
		this.draw_candidate();
	};

	draw_column(i, s=0, e=false){
		let ctx = this.ctx;
		let cur = deck_columns[i];
		e = e || cur.length;
		cur.slice(s,e).forEach((c,k)=>{
			ctx.drawImage((c.reversed?c.image:card_back),
				zone_columns[i].l,
				secPosY+card_marginTop*k,
				card_width,
				card_marginTop);
		});
	};
	clear_column(i, s=0, e=false){
		let ctx = this.ctx;
		e = e || cur.length-1;
		cur.clearRect(zone_columns[i].l,
			secPosY+card_marginTop*s,
			card_width,
			card_height+card_marginTop*(e-s));
	};
	cut_column(i, j){
		let ctx = this.ctx;
		let cur = deck_columns[i];
		this.clear_column(i, j);
		this.draw_column(i, j, j+1);
	};

	draw_candidate(){
		let ctx = this.ctx;
		let candidate = solitare.candidate;
		if (candidate != deck_candidate.length) {
			ctx.drawImage(card_back,posX[0],firPosY,card_width,card_height);
		}
	};
	clear_candidate(){
		let ctx = this.ctx;
		ctx.clearRect(posX[0],firPosY,card_width,card_height);
	};

	draw_shownCandidate(){
		if (candidate == 0) {return}
		let s = candidate<3 ? 0 : candidate-3;
		let e = candidate;
		deck_candidate.slice(s,e).forEach((v,i)=>{
			ctx.drawImage(v.image, posX[1]+card_marginLeft*i, firPosY,card_width,card_height);
		});
	}
}