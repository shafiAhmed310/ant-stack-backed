const router =  require('express').Router();
const {getAllCoupon,addCoupon,redeemCoupon} = require('../controllers/coupon.controller')
router.get('/get-all-coupons',getAllCoupon);
router.post('/add',addCoupon);
router.post('/redeem',redeemCoupon);

module.exports = router;