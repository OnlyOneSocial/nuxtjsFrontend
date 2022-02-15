import Vue from 'vue'
import { tokenize, Options } from 'linkifyjs'

function escapeText (text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeAttr (href) {
  return href.replace(/"/g, '&quot;')
}

const object = {
  bind: (el, binding) => {
  // el.innerHTML = linkifyStr(el.innerHTML, binding.value)

    const opts = new Options(binding.value)

    const tokens = tokenize(el.innerHTML)
    const result = []

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (token.t === 'nl' && opts.nl2br) {
        result.push('<br>\n')
        continue
      } else if (!token.isLink || !opts.check(token)) {
        result.push(escapeText(token.toString()))
        continue
      }

      const {
        formatted,
        formattedHref,
        tagName
      } = opts.resolve(token)

      const url = new URL(formattedHref)

      const link = [`<${tagName} href="${url.hostname === 'only-one.su' ? '' : '/open?url='}${escapeAttr(formattedHref)}"`]

      link.push('target="_blank"')
      link.push('rel="nofollow noopener"')

      link.push(`>${escapeText(formatted)}</${tagName}>`)
      result.push(link.join(''))
    }

    const resultReally = result.join('')
    el.innerHTML = resultReally
  }
}

Vue.directive('linkified', object)
