import {card} from './config';

let zone_candidate = {
	l: card.posX[0],
	r: card.posX[0] + card.width,
	t: card.firPosY,
	b: card.firPosY + card.height,
};

let zone_shownCandidate = {
	l: card.posX[1],
	r(){
		let n = candidate>2 ? 2 : 1;
		return candidate == 0 ? card.posX[1] : card.posX[1]+card.width+card.marginLeft*n;
	},
	t: card.firPosY,
	b: card.firPosY + card.height,
};

let zone_columns = Array.from({length:7}, (v,i)=>({
	l: card.posX[i],
	r: card.posX[i] + card.width,
	t: card.secPosY,
	b(){
		let n = deck_columns[i].length;
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

export {zone_candidate, zone_shownCandidate, zone_columns, zone_sorting}