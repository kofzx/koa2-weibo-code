/**
 * @description 微博 view 路由
 * @author kofzx
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')

// 首页
router.get('/', loginCheck, async (ctx, next) => {
	await ctx.render('index', {})
})

module.exports = router