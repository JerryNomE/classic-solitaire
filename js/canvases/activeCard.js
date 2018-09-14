import new_canvas from './public/new_canvas';
import {canvas as canvas_size, card as card_size} from './public/config';

let image = document.createElement('canvas');
image.width = card_size.width;
let pos={};

export default class canvas_activeCard {
	constructor(parent){
		this.ctx = new_canvas(parent);
	}

	setImage(x,y,cards){
		this.ctx.clearRect(0, 0, canvas_size.width, canvas_size.height);

		pos.x = x;
		pos.y = y;
		image.height = card_size.height + (cards.lenght-1) * card_size.marginTop;
		cards.forEach((v)=>image.drawImage(v.image,
			0, (cards.lenght-1) * card_size.marginTop, card_size.width, card_size.height));

		this.move(0,0);
	}

	/**
	 * 清除上一帧图像，绘制此帧图像
	 * @param  {int} h 移动的水平距离
	 * @param  {int} v 移动的竖直距离
	 */
	move(h=0, v=0){
		this.ctx.clearRect(pos.x, pos.y, image.width, image.height);
		pos.x += h;
		pos.y += v;
		this.ctx.drawImage(pos.x, pos.y, image.width, image.height);
	}
}

