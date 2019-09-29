function createHeaderSearch(el) {
  var $el = $(el)
  var $toggleButton = $el.find('.HeaderSearch__toggle')
  var $form = $el.find('.HeaderSearch__form')
  var $inner = $el.find('.HeaderSearch__inner')
  var $input = $el.find('.HeaderSearch__input')

  var opened = false

  bindEvents()

  function bindEvents() {
    $toggleButton.on('click', function(e) {
      e.preventDefault()
      toggle()
    })
  }

  function toggle() {
    opened ? close() : open()
  }

  function open() {
    opened = true
    $el.addClass('-opened')
    $form.stop().slideDown(500)
    $inner
      .stop()
      .delay(200)
      .fadeIn(700)
    focus()
  }

  function close() {
    opened = false
    $el.removeClass('-opened')
    $inner
      .stop()
      .delay(200)
      .fadeOut(700)
    $form
      .stop()
      .delay(200)
      .slideUp(500)
    focusToggleButton()
  }

  function focus() {
    $input.focus()
  }

  function focusToggleButton() {
    $toggleButton.focus()
  }

  return {
    toggle: toggle,
    open: open,
    close: close,
    focus: focus
  }
}

module.exports = createHeaderSearch
