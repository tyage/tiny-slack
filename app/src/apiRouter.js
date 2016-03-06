import config from '../../config.json'
import { channels, messages } from './db'

export default (app) => {
  const io = app.io

  io.route('get team', function *() {
    this.emit('team', {
      name: config.team.name
    })
  })

  io.route('create channel', function *(next, { name }) {
    // check if channel is unique
    const existChannel = yield channels.find({ name })
    if (existChannel.length > 0) {
      this.emit('create channel result', {
        result: 'fail',
        message: `Channel ${name} is already exists`
      })
      return;
    }

    // validate channel name
    if (!(/^[0-9a-zA-Z_\-]+$/.test(name))) {
      this.emit('create channel result', {
        result: 'fail',
        message: `${name} is invalid channel name`
      })
      return;
    }

    const channel = {
      name
    }

    yield channels.insert(channel)

    this.emit('create channel result', {
      result: 'success',
      channel
    })
    this.broadcast.emit('new channel', {
      channel
    })
  })

  io.route('get channels', function *() {
    this.emit('channels', {
      channels: yield channels.find({})
    })
  })

  io.route('create message', function *(next, { channelId, username, text }) {
    const message = {
      channelId,
      username,
      text,
      createdAt: new Date()
    }

    yield messages.insert(message)

    this.emit('create message result', {
      result: 'success',
      message
    })
    this.broadcast.emit('new message', {
      message
    })
  })

  io.route('get messages', function *(next, { channelId }) {
    this.emit('messages', {
      messages: yield messages.find({ channelId })
    })
  })
}
