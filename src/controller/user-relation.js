/**
 * @description 用户关系 controller
 * @author kofzx
 */

const { getUsersByFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 * 根据userId获取粉丝列表
 * @param  {number} userId 用户
 */
async function getFans(userId) {
	const { count, userList } = await getUsersByFollower(userId);

	return new SuccessModel({
		count, 
		fansList: userList
	})
}

module.exports = {
	getFans
}