const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'khushigaming.com',
  username: 'blazeeye',
  version: false
})

const password = 'harmangt3'
const owner = 'harmangt3'

let warned = false

bot.once('spawn', () => {

  console.log('Joined server')

  setTimeout(() => {
    bot.chat(`/login ${password}`)
  }, 3000)

  setTimeout(() => {

    const clock = bot.inventory.slots[36]

    if (clock) {
      bot.activateItem()
    }

  }, 8000)

})

bot.on('windowOpen', window => {

  if (window.title.includes('Server')) {

    setTimeout(() => {

      bot.clickWindow(13, 0, 0)

      console.log('Clicked survival server')

    }, 2000)

  }

})

setInterval(() => {

  const chest = bot.findBlock({
    matching: block => block.name.includes('chest'),
    maxDistance: 5
  })

  if (!chest) return

  bot.openContainer(chest).then(container => {

    const full = container.slots.every(slot => slot !== null)

    if (full && !warned) {

      console.log('🌵 CACTUS STORAGE FULL')
      warned = true

    }

    if (!full) warned = false

    container.close()

  }).catch(() => {})

}, 60000)


bot.on('chat', (username, message) => {

  if (username !== owner) return

  if (message === 'status') {

    bot.chat('Bot online and checking cactus storage')

  }

  if (message === 'pos') {

    bot.chat(`Position: ${bot.entity.position}`)

  }

  if (message === 'check') {

    bot.chat('Checking chest now')

    const chest = bot.findBlock({
      matching: block => block.name.includes('chest'),
      maxDistance: 5
    })

    if (!chest) {

      bot.chat('Chest not found')
      return
    }

    bot.openContainer(chest).then(container => {

      const full = container.slots.every(slot => slot !== null)

      if (full) {

        bot.chat('Chest FULL')

      } else {

        bot.chat('Chest not full')

      }

      container.close()

    })

  }

})


setInterval(() => {}, 60000)