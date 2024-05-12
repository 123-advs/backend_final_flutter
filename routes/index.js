const userRouter = require('./user')
const topicRouter = require('./topic')
const folderRouter = require('./folder')
const testWritingRouter = require('./testWriting')
const testChoiceRouter = require('./testChoice')
const flashCardRouter = require('./flashCard')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/topic', topicRouter)
    app.use('/api/folder', folderRouter)
    app.use('/api/testwriting', testWritingRouter)
    app.use('/api/testchoice', testChoiceRouter)
    app.use('/api/flashcard', flashCardRouter)
    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes
