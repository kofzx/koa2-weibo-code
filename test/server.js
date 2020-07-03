/**
 * @description jest server
 * @author kofzx
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)