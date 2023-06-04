import { handler } from './handler'
import cron from 'node-cron'

cron.schedule('*/5 * * * * *', handler)
