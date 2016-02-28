import config from '../../config.json'
import { channels, messages } from './db'

export default (app) => {
  const io = app.io

  io.route('get team', function *() {
    this.emit('team', {
      name: config.team.name
    })
  })

  io.route('new channel', function *(next, { name }) {
    // check if channel is unique
    const existChannel = yield channels.find({ name })
    if (existChannel.length > 0) {
      this.emit('new channel result', {
        result: 'fail',
        error: `Channel ${name} is already exists`
      })
      return;
    }

    // validate channel name
    if (!(/^[0-9a-zA-Z_]+$/.test(name))) {
      this.emit('new channel result', {
        result: 'fail',
        error: `${name} is invalid channel name`
      })
      return;
    }

    const channel = {
      name
    }
    yield channels.insert(channel)

    this.broadcast.emit('new channel', {
      channel
    })
    this.emit('new channel result', {
      result: 'success'
    })
  })

  io.route('get channels', function *() {
    this.emit('channels', {
      channels: yield channels.find({})
    })
  })

  io.route('new message', function *(next, { channelId, username, text }) {
    const message = {
      channelId,
      username,
      text,
      createdAt: new Date()
    }

    yield messages.insert(message)

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
