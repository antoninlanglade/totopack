function Maths() {
  function clamp(value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    }
    return value;
  }

  function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }

  function lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
  }
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  return {
    clamp,
    lerp,
    map,
    random
  }
}
const maths = Maths();
export default maths;