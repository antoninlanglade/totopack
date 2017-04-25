export default class BackgroundTools {
    /**
     * Get size and position with a scale function
     * @param {Function} scale
     * @param {Number} ew Element width
     * @param {Number} eh Element height
     * @param {Number} cw Container width
     * @param {Number} ch Container height
     * @return {{width, height, x, y, scale}}
     * @private
     */
    static _sizeAndPositionWithScale(scale, ew, eh, cw, ch) {
        var s = scale(cw / ew, ch / eh),
            w = ew * s,
            h = eh * s;

        return {
            width: w,
            height: h,
            x: (cw - w) * .5,
            y: (ch - h) * .5,
            scale: s
        };
    }

    /**
     * Get positions and size for a cover
     * @param {Number} ew Element width
     * @param {Number} eh Element height
     * @param {Number} cw Container width
     * @param {Number} ch Container height
     * @return {{width, height, x, y, scale}}
     */
    static cover(ew, eh, cw, ch, scale) {
        scale = scale?scale:1;
        return BackgroundTools._sizeAndPositionWithScale(function(scaleX, scaleY) {
            return scaleY > scaleX?scaleY*scale:scaleX*scale;
        }, ew, eh, cw, ch);
    }

    /**
     * Get positions and size for a contain
     * @param {Number} ew Element width
     * @param {Number} eh Element height
     * @param {Number} cw Container width
     * @param {Number} ch Container height
     * @return {{width, height, x, y, scale}}
     */
    static contain(ew, eh, cw, ch) {
        return BackgroundTools._sizeAndPositionWithScale(function(scaleX, scaleY) {
            return scaleY < scaleX?scaleY:scaleX;
        }, ew, eh, cw, ch);
    }
}