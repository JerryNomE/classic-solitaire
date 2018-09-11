import {card} from './config';

let solitaire;

let zone_candidate = {
	l: card.posX[0],
	r: card.posX[0] + card.width,
	t: card.firPosY,
	b: card.firPosY + card.height,
};

let zone_shownCandidate = {
	l: card.posX[1],
	R(){
		if (solitaire.candidate == 0) {return card.posX[1]-1;}
		return solitaire.shownCandidate == 0 ? card.posX[1]+card.width : card.posX[1]+card.width+card.marginLeft*(solitaire.shownCandidate-1);
	},
	t: card.firPosY,
	b: card.firPosY + card.height,
};

let zone_columns = Array.from({length:7}, (v,i)=>({
	l: card.posX[i],
	r: card.posX[i] + card.width,
	t: card.secPosY,
	B(){
		let n = solitaire.deck_columns[i].length;
		n = n == 0 ? 0 : n-1;
		return card.secPosY + card.marginTop * n + card.height;
	}
}));

let zone_sorting = Array.from({length:4}, (v,i)=>({
	l: card.posX[i+3],
	r: card.posX[i+3] + card.width,
	t: card.firPosY,
	b: card.firPosY + card.height,
}));

const set_logic = (logic)=>{solitaire = logic}
export {set_logic, zone_candidate, zone_shownCandidate, zone_columns, zone_sorting}