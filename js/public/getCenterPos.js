/**
 * 传入n个数组，返回1个数组，为要设置的为居中所需要的坐标
 * @param  {...[num]} args [要居中的长度，外部的长度，外部的起始坐标]
 * @return {[num]}         居中用到的坐标
 */
export default function getCenterPos(...args) {
	return args.map(([a,b,c])=> (b-a)/2 + c)
}