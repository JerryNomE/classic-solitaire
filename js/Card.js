import card from './UI/card.js';

let UI_card = card.cards;
let set_w = card.set_w;
let set_h = card.set_h;

const suits = ['spade','heart','club','diamond','joker'];

export default class Card{
	constructor(suit,num,reversed,w,h){
		set_w(w);
		set_h(h);
		suit = suit.toLowerCase();
		num = suit!='joker' ? num : num!=0 ? 1 : 0;

		if (!suits.includes(suit)) {
			console.error(`Unrecognized suit: ${suit}`);
			return false;
		}
		else if (suit != 'joker' && (num<1 || num>13)) {
			console.error(`Error num: ${num}`);
			return false;
		}
		else {
			// 4色1~13
			// 大鬼1 小鬼0
			this.suit = suit;

			this.num = num;

			this.word = suit == 'joker' ? 'joker' : num==13 ? 'K' : num==12 ? 'Q' : num==11 ? 'J' : num;

			this.color = (suit == suits[1] || suit == suits[3]
				|| (suit == suits[4] && num != 0)) ?
				 'red' : 'black';

			this.image = suit == 'joker' ? UI_card['joker'](num) : Object.values(UI_card)[num](suit);

			this.reversed = reversed || true;
		}
	}
}