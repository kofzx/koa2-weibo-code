/**
 * @description 用户关系 services
 * @author kofzx
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param  {[type]} followerId 被跟随者Id
 */
async function getUsersByFollower(followerId) {
	const result = await User.findAndCountAll({
		attributes: ['id', 'userName', 'nickName', 'picture'],
		order: [
			['id', 'desc']
		],
		include: [
			{
				model: UserRelation,
				where: {
					followerId
				}
			}
		]
	})

	let userList = result.rows.map(row => row.dataValues);
	userList = formatUser(userList);

	return {
		count: result.count,
		userList
	}
}

/**
 * 获取关注人列表
 * @param  {number} userId 用户Id
 */
async function getFollowersByUser(userId) {
	const result = await UserRelation.findAndCountAll({
		order: [
			['id', 'desc']
		],
		include: [
			{
				model: User,
				attributes: ['id', 'userName', 'nickName', 'picture']
			}
		],
		where: {
			userId
		}
	})

	let userList = result.rows.map(row => row.dataValues);
	userList = userList.map(item => {
		let user = item.user;
		user = user.dataValues;
		user = formatUser(user);

		return user;
	})

	return {
		count: result.count,
		userList
	}
}

/**
 * 添加关注关系
 * @param {number} userId     用户Id
 * @param {number} followerId 被关注用户Id
 */
async function addFollower(userId, followerId) {
	const result = await UserRelation.create({
		userId,
		followerId
	})

	return result.dataValues;
}

/**
 * 删除关注关系
 * @param {number} userId     用户Id
 * @param {number} followerId 被关注用户Id
 */
async function deleteFollower(userId, followerId) {
	const result = await UserRelation.destroy({
		where: {
			userId,
			followerId
		}
	})

	return result > 0;
}

module.exports = {
	getUsersByFollower,
	getFollowersByUser,
	addFollower,
	deleteFollower
}