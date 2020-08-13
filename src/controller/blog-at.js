/**
 * @description 微博 at 关系 controller
 * @author kofzx
 */

const { getAtRelationCount, getAtUserBlogList } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 获取 @ 我的微博数量
 * @param  {[type]} userId [description]
 * @return {[type]}        [description]
 */
async function getAtMeCount(userId) {
	const count = await getAtRelationCount(userId);
	return new SuccessModel({
		count
	})
}

/**
 * 获取 @ 用户的微博列表
 * @param  {number} userId    userId
 * @param  {Number} pageIndex pageIndex
 * @return {[type]}           [description]
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
	const result = await getAtUserBlogList({
		userId,
		pageIndex,
		pageSize: PAGE_SIZE
	})

	const { count, blogList } = result;

	return new SuccessModel({
		isEmpty: blogList.length === 0,
		blogList,
		pageSize: PAGE_SIZE,
		pageIndex,
		count
	})
}

module.exports = {
	getAtMeCount,
	getAtMeBlogList
}