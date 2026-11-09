// Contrast-section carousel: arrows, dots, autoplay with pause controls,
// swipe, keyboard navigation, and prefers-reduced-motion support.

(() => {
  const root = document.querySelector('.carousel')
  if (!root) return

  const track = root.querySelector('.car-track')
  const slides = [...root.querySelectorAll('.slide')]
  const dotsWrap = root.querySelector('.car-dots')
  const playBtn = root.querySelector('.car-playpause')
  const DELAY = 6000
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let index = 0
  let timer = null
  let userPaused = !(root.getAttribute('data-autoplay') === 'true' && !reduce)
  let hovered = false
  let focused = false

  const go = i => {
    index = (i + slides.length) % slides.length
    track.style.transform = `translateX(${-index * 100}%)`
    dots.forEach((d, di) => {
      d.classList.toggle('active', di === index)
      d.setAttribute('aria-selected', di === index ? 'true' : 'false')
    })
    slides.forEach((s, si) => {
      s.setAttribute('aria-hidden', si === index ? 'false' : 'true')
      s.toggleAttribute('inert', si !== index)
    })
  }

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }
  const play = () => {
    if (userPaused || hovered || focused) return
    stop()
    timer = setInterval(() => go(index + 1), DELAY)
  }
  const resume = () => !userPaused && play()
  const goTo = i => (go(i), resume())          // move + restart the autoplay timer
  const setLabel = () => {
    playBtn.textContent = userPaused ? 'Play' : 'Pause'
    playBtn.setAttribute('aria-label', userPaused ? 'Start automatic rotation' : 'Pause automatic rotation')
  }

  const dots = slides.map((s, i) => {
    const d = document.createElement('button')
    d.className = 'dot'
    d.type = 'button'
    d.setAttribute('role', 'tab')
    const label = s.dataset.title || s.getAttribute('aria-label') || `Slide ${i + 1}`
    d.setAttribute('aria-label', label)
    d.title = label
    d.addEventListener('click', () => goTo(i))
    dotsWrap.appendChild(d)
    return d
  })

  root.querySelector('.prev').addEventListener('click', () => goTo(index - 1))
  root.querySelector('.next').addEventListener('click', () => goTo(index + 1))
  playBtn.addEventListener('click', () => {
    userPaused = !userPaused
    userPaused ? stop() : play()
    setLabel()
  })

  // pause on hover, keyboard focus, and press; resume unless the user paused it
  root.addEventListener('mouseenter', () => (hovered = true, stop()))
  root.addEventListener('mouseleave', () => (hovered = false, resume()))
  // latch the focus-pause only for keyboard focus; mouse clicks are covered by hover
  root.addEventListener('focusin', e => (focused = e.target.matches(':focus-visible'), stop()))
  root.addEventListener('focusout', e => (focused = root.contains(e.relatedTarget), focused || resume()))
  root.addEventListener('pointerdown', stop)
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : resume())

  // touch swipe
  let x0 = null
  root.addEventListener('touchstart', e => { x0 = e.touches[0].clientX }, { passive: true })
  root.addEventListener('touchend', e => {
    if (x0 === null) return
    const dx = e.changedTouches[0].clientX - x0
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1))
    x0 = null
  })

  // keyboard arrows when the carousel has focus
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(index - 1)
    else if (e.key === 'ArrowRight') goTo(index + 1)
  })

  // Deep links: #vs-* shows that slide and suspends autoplay so it stays put.
  const jumpToHash = () => {
    const i = slides.findIndex(s => '#' + s.id === location.hash)
    if (i < 0) return false
    userPaused = true
    stop()
    go(i)
    setLabel()
    return true
  }
  window.addEventListener('hashchange', jumpToHash)

  jumpToHash() || go(0)
  setLabel()
  play()
})()
