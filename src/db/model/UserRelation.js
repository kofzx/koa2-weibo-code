/**
 * @description 用户关注关系
 * @author kofzx
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation', {
	userId: {
		type: INTEGER,
		allowNull: false,
		comment: '用户 id'
	},
	followerId: {
		type: INTEGER,
		allowNull: false,
		comment: '跟随者 id'
	}
})

module.exports = UserRelation