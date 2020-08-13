/**
 * @description 微博 @ 关系 test
 * @author kofzx
 */

const server = require('../server')
const { L_COOKIE, Z_COOKIE, Z_USER_NAME } = require('../testUserInfo')

let BLOG_ID;

test('李四创建一条微博， @ 张三，应该成功', async () => {
	const content = '单元测试自动创建的微博 @张三 - ' + Z_USER_NAME;
	const res = await server
		.post('/api/blog/create')
		.send({
			content
		})
		.set('cookie', L_COOKIE)

	expect(res.body.errno).toBe(0)

	// 记录微博 Id
	BLOG_ID = res.body.data.id;
})

test('获取张三的 @ 列表，应该有刚刚创建的微博', async () => {
	const res = await server
		.get('/api/atMe/loadMore/0')	// 列表是倒序排列
		.set('cookie', Z_COOKIE)

	expect(res.body.errno).toBe(0)
	const data = res.body.data;
	const blogList = data.blogList;
	const isHaveCurBlog = blogList.some(blog => blog.id === BLOG_ID);
	expect(isHaveCurBlog).toBe(true)
})