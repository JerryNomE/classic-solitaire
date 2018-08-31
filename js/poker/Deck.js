import Card from './Card.js';
import UI_card from './UI/card.js';

let suits = {};

export default class Deck{
	constructor(option={}){
		let composition = option.composition ? option.composition : 'default';
		if (composition=='default') {composition = ['spade','heart','club','diamond']}
		else if (composition=='all') {composition = ['spade','heart','club','diamond','joker']}

		this.resize(option.reversed, option.w, option.h);

		this.deck = composition.reduce((pre,cur)=>pre.concat(suits[cur]),[]);
	}

	shuffle(){
		this.deck.sort((a,b)=>Math.random()-.5);
		return this.deck;
	}

	resize(reversed,w,h){
		suits = {
			spade   : Array.from({length:13},(v,i)=>new Card('spade',i+1,reversed,w,h)),
			heart   : Array.from({length:13},(v,i)=>new Card('heart',i+1,reversed,w,h)),
			club    : Array.from({length:13},(v,i)=>new Card('club',i+1,reversed,w,h)),
			diamond : Array.from({length:13},(v,i)=>new Card('diamond',i+1,reversed,w,h)),
			joker   : Array.from({length:2},(v,i)=>new Card('joker',i,reversed,w,h)),
		}
	}
}