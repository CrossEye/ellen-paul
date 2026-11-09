// Site UI behaviors: mobile nav toggle, get-involved tabs, and the intro overlay.

(() => {
  // Mobile nav toggle
  const initNav = () => {
    const toggle = document.querySelector('.nav-toggle')
    const links = document.querySelector('.nav-links')
    if (!toggle || !links) return
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open')
      toggle.setAttribute('aria-expanded', open)
    })
    links.addEventListener('click', e => {
      if (e.target.tagName === 'A') links.classList.remove('open')
    })
  }

  // Get-involved tabs (Volunteer / Yard sign)
  const initTabs = () => {
    const tabs = [...document.querySelectorAll('.form-tabs [role=tab]')]
    if (!tabs.length) return
    const select = tab => tabs.forEach(t => {
      const on = t === tab
      t.setAttribute('aria-selected', on ? 'true' : 'false')
      t.classList.toggle('btn-gold', on)
      t.classList.toggle('btn-ghost', !on)
      const panel = document.getElementById(t.getAttribute('aria-controls'))
      if (panel) panel.hidden = !on
    })
    tabs.forEach(t => {
      t.addEventListener('click', () => select(t))
      t.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
        e.preventDefault()
        const i = tabs.indexOf(t)
        const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]
        n.focus()
        select(n)
      })
    })
  }

  initNav()
  initTabs()
})()
