import monk from 'monk'
import monkWrapper from 'co-monk'

import config from '../../config.json'

const db = monk(config.mongoDb.uri)
export const channels = monkWrapper(db.get('channels'))
export const messages = monkWrapper(db.get('messages'))
