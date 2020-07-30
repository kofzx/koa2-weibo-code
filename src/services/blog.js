/**
 * @description 微博 service
 * @author kofzx
 */

const { Blog, User } = require('../db/model/index')
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

module.exports = {
	createBlog,
	getBlogListByUser
}