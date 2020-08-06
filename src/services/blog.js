/**
 * @description 微博 service
 * @author kofzx
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建微博
 * @param  {Object} param0 创建微博所需数据 { userId, content, image }
 */
async function createBlog({ userId, content, image }) {
	const result = await Blog.create({
		userId,
		content,
		image
	})

	return result.dataValues;
}

/**
 * 根据用户获取微博列表
 * @param  {Object} param0  查询参数
 */
async function getBlogListByUser(
	{ userName, pageIndex = 0, pageSize = 10 }
) {
	const userWhereOpts = {};
	if (userName) {
		userWhereOpts.userName = userName;
	}

	// 执行查询
	const result = await Blog.findAndCountAll({
		limit: pageSize,
		offset: pageSize * pageIndex,
		order: [
			['id', 'desc']
		],
		include: [
			{
				model: User,
				attributes: ['userName', 'nickName', 'picture'],
				where: userWhereOpts
			}
		]
	})

	let blogList = result.rows.map(row => row.dataValues);

	// 格式化
	blogList = formatBlog(blogList);
	blogList = blogList.map(blogItem => {
		const user = blogItem.user.dataValues;
		blogItem.user = formatUser(user);
		return blogItem;
	});

	console.log(blogList);

	return {
		count: result.count,
		blogList
	}
}

/**
 * 获取关注人的微博列表 （首页）
 * @param  {Object} param0    查询条件 { userId, pageIndex = 0, pageSize = 10 }
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
	const result = await Blog.findAndCountAll({
		limit: pageSize,	// 每页多少条
		offset: pageSize * pageIndex,	// 跳过多少条
		order: [
			['id', 'desc']
		],
		include: [
			{
				model: User,
				attributes: ['userName', 'nickName', 'picture']
			},
			{
				model: UserRelation,
				attributes: ['userId', 'followerId'],
				where: { userId }
			}
		]
	})

	let blogList = result.rows.map(row => row.dataValues);
	blogList = formatBlog(blogList);
	blogList = blogList.map(blogItem => {
		blogItem.user = formatUser(blogItem.user.dataValues);
		return blogItem;
	})

	return {
		count: result.count,
		blogList
	}
}

module.exports = {
	createBlog,
	getBlogListByUser,
	getFollowersBlogList
}