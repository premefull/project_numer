const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Fx = new Schema(
    {
        fx: { type: String, required: true},
        xl: { type: Number, required: false },
        xr: { type: Number, required: false },
        x0: { type: Number, required: false },
        x: { type: Number, required: false },
        h: { type: Number, required: false },
        a: { type: Number, required: false },
        b: { type: Number, required: false },
        n: { type: Number, required: false },
        x11: { type: Number, required: false },
        x12: { type: Number, required: false },
        x13: { type: Number, required: false },
        x21: { type: Number, required: false },
        x22: { type: Number, required: false },
        x23: { type: Number, required: false },
        x31: { type: Number, required: false },
        x32: { type: Number, required: false },
        x33: { type: Number, required: false },
        y1: { type: Number, required: false },
        y2: { type: Number, required: false },
        y3: { type: Number, required: false },
        row: { type: Number, required: false },
        column: { type: Number, required: false }
    },
    { timestamps: true },
   
)

module.exports = mongoose.model('fxs', Fx)
