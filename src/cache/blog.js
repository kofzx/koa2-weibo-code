/**
 * @description 微博缓存层
 * @author kofzx
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表缓存
 * @param  {number} pageIndex 
 * @param  {number} pageSize  
 */
async function getSquareCacheList(pageIndex, pageSize) {
	const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;

	// 尝试获取缓存
	const cacheResult = await get(key);
	if (cacheResult != null) {
		// 获取缓存成功
		return cacheResult;
	}

	const result = await getBlogListByUser({ pageIndex, pageSize });

	// 设置缓存，过期时间 1min
	set(key, result, 60);

	return result;
}

module.exports = {
	getSquareCacheList
}