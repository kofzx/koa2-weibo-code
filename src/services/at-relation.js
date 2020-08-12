/**
 * @description 微博 @ 用户关系 service
 * @author kofzx
 */

const { AtRelation } = require('../db/model/index')

/**
 * 创建微博 @ 用户关系
 * @param  {number} blogId 微博 Id
 * @param  {number} userId 用户 Id
 */
async function createAtRelation(blogId, userId) {
	const result = await AtRelation.create({
		blogId,
		userId
	})

	return result.dataValues;
}

module.exports = {
	createAtRelation
}