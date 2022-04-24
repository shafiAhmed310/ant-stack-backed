const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    couponCode:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    couponType:{
        type:String,
        required:true,
    },
    discountPercentage:{
        type:Number,
        required:true,
        max:100
    },
    minimunDiscoutAmount:{
        type:Number,
        required:true
    },
    maxDiscountAmount:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    expiredAt:{
        type:Date,
        required:true
    },
})

const coupon = mongoose.model('coupon',couponSchema);
module.exports = coupon;