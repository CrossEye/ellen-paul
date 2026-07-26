// Volunteer + Lawn-sign forms -> Google Forms submission engine.
// TO GO LIVE: edit the FORMS config below - swap each `action` (.../formResponse URL)
// and the entry.<id> values (from the Google Form's "Get pre-filled link").
// While an `action` is empty, that form runs in DEMO mode (no real POST; logs to console).

(() => {
  const FORMS = {
    volunteer: {
      // TEST form (Scott-owned throwaway): "Volunteer for Ellen's Campaign"
      action: 'https://docs.google.com/forms/d/e/1FAIpQLSeH8hTUIOF1m6b4ALLG1VctAYx1mv1IRxGUjY_L2JVcPZXGcA/formResponse',
      fields: {
        first_name: 'entry.286266956',
        last_name: 'entry.88190668',
        email: 'entry.1494294687',
        phone: 'entry.1892463346',
        volunteer: 'entry.1793466122',
        sms_optin: 'entry.1692416607'
      }
    },
    lawnsign: {
      // TEST copy (Scott-owned throwaway). PRODUCTION values for the real form
      // live in content/lawn-sign-form-fields.md - swap them in at handoff.
      action: 'https://docs.google.com/forms/d/e/1FAIpQLScHjy4ryPPFQtgdNl5_Rz3OOKuGNz1pC7TbX2xImZZu95tAXQ/formResponse',
      fields: {
        email: 'entry.65968774',
        name: 'entry.1252955982',
        phone: 'entry.1203343963',
        town: 'entry.859003342',
        address: 'entry.102910530',
        pref: 'entry.1188913824'
      }
    }
  }

  const sink = document.createElement('iframe')
  sink.name = 'gform-sink'
  sink.style.display = 'none'
  document.body.appendChild(sink)

  const gather = formEl =>
    Array.from(formEl.elements).reduce((data, el) => {
      const take = el.type === 'checkbox' || el.type === 'radio' ? el.checked : el.value !== ''
      if (el.name && take) data[el.name] = el.value
      return data
    }, {})

  const post = (cfg, data, done) => {
    if (!cfg.action) {
      console.log('[demo submit] payload:', data)
      setTimeout(done, 450)
      return
    }
    const f = document.createElement('form')
    f.action = cfg.action
    f.method = 'POST'
    f.target = 'gform-sink'
    f.style.display = 'none'
    Object.keys(data).forEach(k => {
      const names = cfg.fields[k]
      if (!names) return
      const list = Array.isArray(names) ? names : [names]
      list.forEach(name => {
        if (!name || name.includes('PLACEHOLDER')) return
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = data[k]
        f.appendChild(input)
      })
    })
    let fired = false
    const finish = () => {
      if (fired) return
      fired = true
      done()
    }
    sink.addEventListener('load', finish, { once: true })
    setTimeout(finish, 2500)                    // fallback: response is opaque, assume success
    document.body.appendChild(f)
    f.submit()
    setTimeout(() => f.remove(), 200)
  }

  const wire = (formId, cfgKey, thanksId) => {
    const formEl = document.getElementById(formId)
    if (!formEl) return
    const thanks = document.getElementById(thanksId)
    formEl.addEventListener('submit', e => {
      e.preventDefault()
      if (!formEl.reportValidity()) return
      const btn = formEl.querySelector('[type=submit]')
      if (btn) {
        btn.disabled = true
        btn.textContent = 'Sending…'
      }
      post(FORMS[cfgKey], gather(formEl), () => {
        formEl.hidden = true
        if (thanks) thanks.hidden = false
      })
    })
  }

  wire('vol-form', 'volunteer', 'vol-thanks')
  wire('lawn-form', 'lawnsign', 'lawn-thanks')
})()
