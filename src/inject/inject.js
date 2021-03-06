var classes = [
  '.recipe-ingred_txt.added',
  '.ingredients-item-name',
];
const transformers = {
  // more than meets the eye
  "pound": (q) => q * 453.592,
  "tablespoon": (q) => q * 14.3,
  "teaspoon": (q) => q * 4.26,
  "ounce": (q) => q * 28.3495,
  "cup": (q) => q * 128,
}
const get_quantity = (q, a) => {
  if (q.indexOf('/') > -1) {
    return eval(`${a} + (${q})`)
  }
  return parseFloat(a+q)
}
const is_num = str => /^\d+$/.test(str)

const trim_word = word => {
  word = word.endsWith(')') ? word.slice(0,-1) : word
  word = word.startsWith('(') ? word.slice(1) : word
  return word
}

const get_word = (word) => trim_word(convert_unicode(word))

const convert_unicode = word => {
  return word
  .replace("¼", '1/4')
  .replace("½", '1/2')
  .replace("¾", '3/4')
  .replace("⅔", '2/3')
  .replace("⅓", "1/3")
}

const adjust_text = (t) => {
  let adjusted_text = t
  Object.keys(transformers).forEach(k => {
    if (!t.includes(k)) return
    const words = t.replace(" "," ").split(' ')
    for (let i=0; i < words.length; i++) {
      if (!words[i].includes(k)) continue
      const addition = (is_num(words[i-2]) && !words[i-1].startsWith('('))
      ? parseFloat(words[i-2])
      : 0
      let quantity = get_quantity(
        get_word(words[i-1]),
        addition
      )
      let word = trim_word(words[i])
      if (word === k+'s') {
        word = k
      }
      let new_quantity = transformers[word](quantity).toFixed(2).toString()
      if (words[i-1].startsWith('(')) new_quantity = "(" + new_quantity
      words[i-1] = new_quantity
      words[i] = words[i].replace(word, "gram")
      if (addition > 0) {
        words.splice(i-2,1)
      }
    }
    adjusted_text = words.join(' ')
  })
  return adjusted_text
}
var adjust_page = () => {
  classes.forEach(cls => {
    $(cls).each(function(index) {
      const el = $(this)[0]
      el.innerText = adjust_text(el.innerText)
    })
  });
}
chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      adjust_page()
    }
  }, 10);
});
