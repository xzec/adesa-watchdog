import { handler } from './handler'
import cron from 'node-cron'

cron.schedule('*/10 * * * * *', async () => {
  await console.log('running a task every 10 s')
})

void handler()
