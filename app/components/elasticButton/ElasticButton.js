require('./ElasticButton.scss');
import React from 'react';
import RAF from 'raf';
import 'gsap';

const OFFSET = 15;
const POSITIONS = ["top","right","bottom","left"];

/* Spring stiffness, in kg / s^2 */
const K = -15;
/* Damping constant, in kg / s */
const B = -0.97;

class ElasticButton extends React.Component {
	constructor(props) {
		super();
		this.mouseMove = this.mouseMove.bind(this);
		this.drawPath = this.drawPath.bind(this);
		this.update = this.update.bind(this);

		this.bottomBounce = { current: 0, target: 0, _a: 0, _v: 0, mass: 0.03 };
		this.topBounce = { current: 0, target: 0, _a: 0, _v: 0, mass: 0.03 };
		this.leftBounce = { current: 0, target: 0, _a: 0, _v: 0, mass: 0.03 };
		this.rightBounce = { current: 0, target: 0, _a: 0, _v: 0, mass: 0.03 };

		this.enter = false;
		this.anim = "";
	}

	componentDidMount() {
		this._t = Date.now();
		window.addEventListener('mousemove', this.mouseMove);
		RAF.add(this.update);
	}	

	componentWillUnmount() {
		RAF.remove(this.update);
		window.removeEventListener('mousemove', this.mouseMove);
	}

	mouseMove(e) {
		const bounds = this.refs.component.getBoundingClientRect();
		const mousePos = { x : e.clientX, y : e.clientY };
		const offset = { x: mousePos.x - (bounds.left + bounds.width * 0.5), y: mousePos.y - (bounds.top + bounds.height * 0.5) };
		const angle = this.angleBetweenPoints({ x: bounds.left + bounds.width * 0.5, y: bounds.top + bounds.height * 0.5}, mousePos) + 180;
		
		// Enter & Leave zone button
		if (mousePos.x >= bounds.left && 
			mousePos.x <= bounds.right && 
			mousePos.y >= bounds.top && 
			mousePos.y <= bounds.bottom && !this.enter) {
				this.enter = true;
				this.anim = '';
				this.reset(this.anim);
		}
		else if (!(mousePos.x >= bounds.left && 
					mousePos.x <= bounds.right && 
					mousePos.y >= bounds.top && 
					mousePos.y <= bounds.bottom) && this.enter) {
				this.enter = false;
		}
		
		// Choose wich side will animate
		if (angle >= 45 && angle < 135 && mousePos.y > bounds.top - 30) {
			this.topBounce.target = Math.abs(offset.y / (bounds.height * 0.5 + OFFSET)) * !this.enter ? -1 : 1;
			
			if (this.anim !== 'top') {
				this.anim = 'top';
				this.reset(this.anim);
			}
			
		}
		else if (angle >= 135 && angle < 225 && mousePos.x < bounds.right + 30) {
			this.rightBounce.target = Math.abs(offset.x / (bounds.width * 0.5 + OFFSET)) * !this.enter ? -1 : 1;
			
			
			if (this.anim !== 'right') {
				this.anim = 'right';
				this.reset(this.anim);
			}
		}
		else if (angle >= 225 && angle < 315 && mousePos.y < bounds.bottom + 30) {
			this.bottomBounce.target = Math.abs(offset.y / (bounds.height * 0.5 + OFFSET)) * !this.enter ? -1 : 1;

			if (this.anim !== 'bottom') {
				this.anim = 'bottom';
				this.reset(this.anim);
			}

		}
		else if ((angle >= 315 || angle < 45) && mousePos.x > bounds.left - 30){
			this.leftBounce.target = Math.abs(offset.x / (bounds.width * 0.5 + OFFSET)) * !this.enter ? -1 : 1;

			if (this.anim !== 'left') {
				this.anim = 'left';
				this.reset(this.anim);
			}
		}
		else {
			if (this.anim !== '') {
				this.anim = '';
				this.reset(this.anim);
			}
		}
	}

	drawPath() {
		const bounds = this.refs.component.getBoundingClientRect();
		const topPoints = {
			x1: OFFSET, y1: OFFSET,
			x2: OFFSET + bounds.width,
			y2: OFFSET,
			xq: OFFSET + bounds.width / 2,
			yq: OFFSET - this.topBounce.current * OFFSET
		}

		const rightPoints = {
			x1: OFFSET + bounds.width, y1: OFFSET,
			x2: OFFSET + bounds.width,
			y2: OFFSET + bounds.height,
			xq: OFFSET + bounds.width + this.rightBounce.current * OFFSET,
			yq: OFFSET + bounds.height * .5
		}

		const bottomPoints = {
			x1: OFFSET + bounds.width, y1: OFFSET + bounds.height,
			x2: OFFSET,
			y2: OFFSET + bounds.height,
			xq: OFFSET + bounds.width * .5,
			yq: OFFSET + bounds.height + this.bottomBounce.current * OFFSET
		}

		const leftPoints = {
			x1: OFFSET, y1: OFFSET + bounds.heigh,
			x2: OFFSET,
			y2: OFFSET,
			xq: OFFSET - this.leftBounce.current * OFFSET,
			yq: OFFSET + bounds.height * .5
		}

		const path = this.createPath([
			this.move(topPoints.x1, topPoints.y1),
			this.quadratic(topPoints.xq, topPoints.yq, topPoints.x2, topPoints.y2),
			this.quadratic(rightPoints.xq, rightPoints.yq, rightPoints.x2, rightPoints.y2),
			this.quadratic(bottomPoints.xq, bottomPoints.yq, bottomPoints.x2, bottomPoints.y2),
			this.quadratic(leftPoints.xq, leftPoints.yq, leftPoints.x2, leftPoints.y2)

		]);

		this.refs.path.setAttribute('d', path);
	}

	reset(pos, reset) {
		if (pos !== 'top') {
			this.topBounce.target = 0;
		}
		if (pos !== 'bottom') {
			this.bottomBounce.target = 0;
		}
		if (pos !== 'left') {
			this.leftBounce.target = 0;
		}
		if (pos !== 'right') {
			this.rightBounce.target = 0;
		}
	}
	
	createPath(instructions) {
		let path = "";
		instructions.forEach((instruction) => {
			path += instruction;
		});
		return path;
	}

	move(x, y) {
		return ` M ${x} ${y} `;
	}

	curve(xc1, yc1, xc2, yc2, x2, y2) {
		return ` C ${xc1} ${yc1}, ${xc2} ${yc2}, ${x2} ${y2} `;
	}

	quadratic(xq, yq, x2, y2) {
		return ` Q ${xq} ${yq}, ${x2} ${y2} `;
	}

	line(x, y) {
		return ` L ${x} ${y} `;
	}

	angleBetweenPoints(point1, point2) {
		return Math.atan2((point2.y - point1.y), (point2.x - point1.x)) * 180 / Math.PI;
	}

	mapVal(value, start1, stop1, start2, stop2) {
		return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
	}

	update() {
		var now = Date.now();
		var t = now - this._t;
		this._t = now;
		
		this.drawPath();
		
		this.lerp(this.bottomBounce, t);
		this.lerp(this.topBounce, t);
		this.lerp(this.leftBounce, t);
		this.lerp(this.rightBounce, t);
	}

	lerp(obj, t) {
		var spring = K * ((obj.current - obj.target));
		var damper = B * (obj._v);
		
		obj._a = (spring + damper) / obj.mass;
		obj._v += obj._a * (t / 1000);
		obj.current += obj._v * (t / 1000);
	}

	render() {
		return <div className="elasticButton" ref="component">
			<svg xmlns="http://www.w3.org/2000/svg">
				<path ref="path" d="" fill={this.props.color || '#e74c3c'}/>
			</svg>
			{this.props.children}	
		</div>;
	}
}

export default ElasticButton;