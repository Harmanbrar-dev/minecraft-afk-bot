const mineflayer = require('mineflayer')

function createBot() {

  const bot = mineflayer.createBot({
    host: 'khushigaming.com',
    username: 'blazeeye'
  })

  bot.once('spawn', () => {

    console.log('Joined lobby')

    // Step 1: login
    setTimeout(() => {
      bot.chat('/login harmangt3')
      console.log('Logged in')
    }, 3000)

    // Step 2: open clock selector (hotbar slot 1 = index 0)
    setTimeout(() => {
      bot.setQuickBarSlot(0)
      bot.activateItem()
      console.log('Opened selector menu')
    }, 7000)

  })

  // Step 3: click Survival head in GUI
  bot.on('windowOpen', (window) => {

    console.log('Selector GUI opened')

    setTimeout(() => {

      // Survival head slot from your screenshot
      bot.clickWindow(13, 0, 0)

      console.log('Clicked Survival server')

    }, 2000)

  })

  // reconnect automatically if kicked
  bot.on('end', () => {
    console.log('Disconnected — reconnecting...')
    setTimeout(createBot, 5000)
  })

  bot.on('error', err => console.log(err))

}

createBot()
