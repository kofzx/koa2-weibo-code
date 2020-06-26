const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    blogList: [
      {
        id: 1,
        title: 'aaa'
      },
      {
        id: 2,
        title: 'bbb'
      },
      {
        id: 3,
        title: 'ccc'
      },
    ]
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:username', async (ctx, next) => {
	const { username } = ctx.params;
	ctx.body = {
    	title: 'This is profile page',
    	username
  	}
})

router.get('/loadMore/:username/:pageIndex', async (ctx, next) => {
	const { username, pageIndex } = ctx.params;
	ctx.body = {
    	title: 'This is loadMore api',
    	username,
    	pageIndex
  	}
})

module.exports = router
