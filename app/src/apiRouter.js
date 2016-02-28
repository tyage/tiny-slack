import Router from 'koa-router'
import parse from 'co-body'

import config from '../../config.json'
import { channels, messages } from './db'

const apiRouter = Router({
  prefix: '/api'
})
apiRouter
  .get('/team', function *() {
    this.body = {
      name: config.team.name
    }
  })
  .post('/channels/new', function *() {
    const { name } = yield parse(this)
    const channel = {
      name
    }

    // check if channel is unique
    const existChannel = yield channels.find({ name })
    if (existChannel.length > 0) {
      this.body = {
        error: `Channel ${name} is already exists`
      }
      return;
    }

    // validate channel name
    if (!(/^[0-9a-zA-Z_]+$/.test(name))) {
      this.body = {
        error: `${name} is invalid channel name`
      }
      return;
    }

    yield channels.insert(channel)

    this.body = {
      channel
    }
  })
  .get('/channels', function *() {
    this.body = {
      channels: yield channels.find({})
    }
  })
  .post('/messages/:channelId/new', function *() {
    const channelId = this.params.channelId
    const { username, text } = yield parse(this)
    const message = {
      channelId,
      username,
      text,
      createdAt: new Date()
    }

    yield messages.insert(message)

    this.body = {
      message
    }
  })
  .get('/messages/:channelId', function *() {
    const channelId = this.params.channelId
    const channelMessages = yield messages.find({ channelId })

    this.body = {
      messages: channelMessages
    }
  })

export default apiRouter
