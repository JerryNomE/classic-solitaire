import new_canvas from './public/new_canvas';
import {zone_candidate, zone_shownCandidate, zone_columns, zone_sorting} from './public/zones';
import {canvas as canvas_size, card as card_size} from './public/config';
import UI_card from '../poker/UI/card';

// 斜绿背景
let canvas_bg_proto = document.createElement('canvas');
let canvas_bg_proto_size   = 100;
let canvas_bg_proto_color1 = 'lime';
let canvas_bg_proto_color2 = '#00dd00';
{
	canvas_bg_proto.width  = canvas_bg_proto_size;
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
}


export default class canvas_bg {
	constructor(parent){
		this.ctx = new_canvas(parent);
		this.init();
	}

	init(){
		let ctx = this.ctx;

		let bg = ctx.createPattern(canvas_bg_proto,'repeat');
		ctx.fillStyle = bg;
		ctx.fillRect(0,0,canvas_size.width,canvas_size.height);


		ctx.drawImage(UI_card.cards.border,
			zone_candidate.l,  zone_candidate.t,  card_size.width,card_size.height);

		ctx.drawImage(UI_card.cards.border,
			zone_sorting[0].l, zone_sorting[0].t, card_size.width,card_size.height);
		ctx.drawImage(UI_card.cards.border,
			zone_sorting[1].l, zone_sorting[1].t, card_size.width,card_size.height);
		ctx.drawImage(UI_card.cards.border,
			zone_sorting[2].l, zone_sorting[2].t, card_size.width,card_size.height);
		ctx.drawImage(UI_card.cards.border,
			zone_sorting[3].l, zone_sorting[3].t, card_size.width,card_size.height);

		ctx.drawImage(UI_card.cards.border,
			zone_columns[0].l, zone_columns[0].t, card_size.width,card_size.height);
		ctx.drawImage(UI_card.cards.border,
			zone_columns[1].l, zone_columns[1].t, card_size.width,card_size.height);
		ctx.drawImage(UI_card.cards.border,
			zone_columns[2].l, zone_columns[2].t, card_size.width,card_size.height);
		ctx.drawImage(UI_card.cards.border,
			zone_columns[3].l, zone_columns[3].t, card_size.width,card_size.height);
		ctx.drawImage(UI_card.cards.border,
			zone_columns[4].l, zone_columns[4].t, card_size.width,card_size.height);
		ctx.drawImage(UI_card.cards.border,
			zone_columns[5].l, zone_columns[5].t, card_size.width,card_size.height);
		ctx.drawImage(UI_card.cards.border,
			zone_columns[6].l, zone_columns[6].t, card_size.width,card_size.height);
	}
}