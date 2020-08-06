/**
 * @description 首页 api 路由
 * @author kofzx
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create, getHomeBlogList } = require('../../controller/blog-home')
const blogValidate = require('../../validator/blog')
const { genValidator } = require('../../middlewares/validator')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
	const { content, image } = ctx.request.body;
	const { id: userId } = ctx.session.userInfo;
	ctx.body = await create({
		userId,
		content,
		image
	});
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const { id: userId } = ctx.session.userInfo;
    const result = await getHomeBlogList(userId, pageIndex);
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

module.exports = router