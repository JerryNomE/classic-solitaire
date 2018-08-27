import Card from './Card.js';

let suits = {
	spade   : Array.from({length:13},(v,i)=>new Card('spade',i+1)),
	heart   : Array.from({length:13},(v,i)=>new Card('heart',i+1)),
	club    : Array.from({length:13},(v,i)=>new Card('club',i+1)),
	diamond : Array.from({length:13},(v,i)=>new Card('diamond',i+1)),
	joker   : Array.from({length:13},(v,i)=>new Card('joker',i)),
}

export default class Deck{
	constructor(...content){
		if (content[0]=='default') {content = ['spade','heart','club','diamond']}
		else if (content[0]=='all') {content = ['spade','heart','club','diamond','joker']}

		this.deck = content.reduce((pre,cur)=>pre.concat(suits[cur]),[]);
	}

	shuffle(){
		this.deck.sort((a,b)=>Math.random()-.5);
	}

	resize(w,h){
		suits = {
			spade   : Array.from({length:13},(v,i)=>new Card('spade',i+1,w,h)),
			heart   : Array.from({length:13},(v,i)=>new Card('heart',i+1,w,h)),
			club    : Array.from({length:13},(v,i)=>new Card('club',i+1,w,h)),
			diamond : Array.from({length:13},(v,i)=>new Card('diamond',i+1,w,h)),
			joker   : Array.from({length:13},(v,i)=>new Card('joker',i,w,h)),
		}
	}
}