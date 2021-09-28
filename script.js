const dino = document.querySelector('.dino')
const background = document.querySelector('.screen-game')
let isJumping = false
let position = 0

const createCactus = () => {
  const cactus = document.createElement('div')
  let cactusPosition = 1000
  let randomTime = Math.random() * 5000

  cactus.classList.add('cactus')
  cactus.style.left = cactusPosition + 'px'
  background.appendChild(cactus)

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval)
      background.removeChild(cactus)
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval)
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo!</h1>'
    } else {
      cactusPosition -= 10
      cactus.style.left = cactusPosition + 'px'
    }
  }, 20)
  setTimeout(createCactus, randomTime)
}

const jump = () => {
  isJumping = true
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval)
      // descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval)
          isJumping = false
        } else {
          position -= 20
          dino.style.bottom = position + 'px'
        }
      }, 20)
    } else {
      // subindo
      position += 20
      dino.style.bottom = position + 'px'
    }
  }, 20)
}

const handleKeyUp = event => {
  if (event.key.match().input === ' ') {
    if (!isJumping) {
      jump()
    }
  }
}
createCactus()
document.addEventListener('keyup', handleKeyUp)
