const mineflayer = require('mineflayer')

function createBot() {

  const bot = mineflayer.createBot({
    host: 'khushigaming.com',
    username: 'blazeeye',
    version: false // auto-detect version
  })

  bot.once('spawn', () => {

    console.log('Joined lobby')

    setTimeout(() => {
      bot.chat('/login harmangt3')
      console.log('Logged in')
    }, 3000)

    setTimeout(() => {
      bot.setQuickBarSlot(0)
      bot.activateItem()
      console.log('Opened selector menu')
    }, 7000)

  })

  bot.on('windowOpen', (window) => {

    const title = String(window.title)

    if (title.includes('Selector') || title.includes('Server')) {

      console.log('Selector GUI opened')

      setTimeout(() => {

        bot.clickWindow(13, 0, 0)

        console.log('Clicked Survival server')

      }, 2000)

    }

  })

  bot.on('kicked', reason => {
    console.log('Kicked:', reason)
  })

  bot.on('end', () => {
    console.log('Disconnected — reconnecting...')
    setTimeout(createBot, 10000)
  })

  bot.on('error', err => {
    console.log('Error:', err.message)
  })

}

createBot()
