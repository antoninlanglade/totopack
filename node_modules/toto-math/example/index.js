import Maths from '../src/index.js';

const random = Maths.random(1,13);
const clamp = Maths.clamp(random,5,7);
const map = Maths.map(clamp, 5, 7, 0, 1);

console.log('Random between 1 & 13', random);
console.log('Clamp between 5 & 7', clamp);
console.log('Map 5 -> 7 to 0 -> 1', map);

let currentLerp = 0;
currentLerp = Maths.lerp(currentLerp, 1, 0.01);
console.log('Lerp', currentLerp);
currentLerp = Maths.lerp(currentLerp, 1, 0.01);
console.log('Lerp', currentLerp);
currentLerp = Maths.lerp(currentLerp, 1, 0.01);
console.log('Lerp', currentLerp);
currentLerp = Maths.lerp(currentLerp, 1, 0.01);
console.log('Lerp', currentLerp);

