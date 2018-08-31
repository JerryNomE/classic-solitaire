import {canvas as canvas_size} from './config';
/**
 * 新增图层
 * @return {context} 图层的2D context
 */
export default (parent) => {
	let canvas = document.createElement('canvas');
	canvas.width = canvas_size.width;
	canvas.height = canvas_size.height;
	parent.appendChild(canvas);

	return canvas.getContext('2d');
}