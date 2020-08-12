/**
 * @description 微博 at 关系 controller
 * @author kofzx
 */

const { getAtRelationCount } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')

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

module.exports = {
	getAtMeCount
}