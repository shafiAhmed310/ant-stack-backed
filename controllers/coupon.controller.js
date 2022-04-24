const Coupon = require('../model/coupon.model');


const getAllCoupon = async (req, res, next) => {
    try {
        const coupons = await Coupon.find();
        if (coupons) {
            res.status(200).json({ error: false, message: 'Coupons fetched successfully', response: coupons });
        } else {
            res.status(404).json({ error: error, message: 'Coupons not found' })
        }
    } catch (err) {
        next(err)
    }

}

const addCoupon = async (req, res, next) => {
    try {
        const { couponType, couponCode,discountPercentage, minimunDiscoutAmount, maxDiscountAmount, expiredAt } = req.body;
           const coupon = await Coupon.findOne({couponCode:couponCode});
           if(!coupon){
            const generatedCoupon = await Coupon.create({
                couponType,
                couponCode ,
                discountPercentage,
                minimunDiscoutAmount,
                maxDiscountAmount,
                expiredAt
            });
    
            if (generatedCoupon) {
                res.status(200).json({ error: false, message: 'Coupon added successfully', response: generatedCoupon.couponCode })
            } else {
                res.status(200).json({ error: true, message: 'Something went wrong' })
            }
           }else{
            res.status(404).json({ error: true, message: 'Coupon already exists' })
           }
       

    } catch (err) {
        next(err)
    }

}

const redeemCoupon = async (req, res, next) => {
    try {
        const { couponCode, amount } = req.body;
        let coupon = await Coupon.findOne({ couponCode: couponCode });
        let expireDate = new Date(coupon.expiredAt).getTime();
        let presentDate = new Date().getTime();
        if (coupon && expireDate > presentDate) {
            if (amount >= coupon.minimunDiscoutAmount) {
                if (coupon.couponType === 'Flat discount') {
                    const discountAmount = (amount * coupon.discountPercentage) / 100;
                    let discount = amount - discountAmount;
                    res.status(200).json({ error: false, message: 'Coupon applied successfully', response: {CartValue:discount,discount:discountAmount} })
                }
                else {
                        const maxDiscountAmount = (amount * coupon.discountPercentage) / 100;
                     let discount =   maxDiscountAmount>=coupon.maxDiscountAmount ? coupon.maxDiscountAmount : maxDiscountAmount;
                     let couponApplied  = amount - discount
                        res.status(200).json({ error: false, message: 'Coupon applied successfully', response:  {CartValue:couponApplied,discount:discount} })
                    
                }
            } else {
                res.status(200).json({ error: false, message: `Entered amount should be greater than minimum cart value` })
            }
        } else {
            res.status(400).json({ error: false, message: 'Coupon expired!' })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { getAllCoupon, addCoupon, redeemCoupon }