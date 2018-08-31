import Deck from '../poker/Deck.js';

let d = new Deck({reversed:false});

export default class {
	constructor(CANVAS){
		this.zone = document.getElementById();
		set_canvasSize();
		window.addEventListener('resize',()=>{set_canvasSize()})
		this.init();
	}
	init(){
		d.shuffle();
		let deck = [].concat(d.deck);
		this.deck_columns = Array.from({length:7},(v,i)=>deck.splice(0,i+1));
		this.deck_columns.forEach((v,i)=>{v[i].reversed = true});
		this.deck_candidate = deck;
		this.deck_sorting = new Array(4);

		this.candidate = 0;
	}
}