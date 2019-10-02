function create(el) {
  var $el = $(el)
  var $toggleButton = $el.find('.HeaderSearch__toggle')
  var $form = $el.find('.HeaderSearch__form')
  var $inner = $el.find('.HeaderSearch__inner')
  var $input = $el.find('.HeaderSearch__input')

  var opened = false

  bindEvents()

  function bindEvents() {
    $toggleButton.on('click', onClickToggleButton)
    $form.on('keydown', onKeyDownForm)
  }

  function onClickToggleButton(e) {
    e.preventDefault()
    toggle()
  }

  function onKeyDownForm(e) {
    if (opened && e.keyCode === 27 /* Escape */) {
      e.preventDefault()
      close()
    }
  }

  function toggle() {
    opened ? close() : open()
  }

  function open() {
    opened = true

    $el.addClass('-opened')
    $form.stop(true, false).slideDown(500)
    $inner
      .stop(true, false)
      .delay(200)
      .animate({ opacity: 1 }, 700, function() {
        focus()
      })
  }

  function close() {
    opened = false

    focusToggleButton()
    $el.removeClass('-opened')
    $inner.stop(true, false).animate({ opacity: 0 }, 700)
    $form
      .stop(true, false)
      .delay(200)
      .slideUp(600)
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

module.exports.create = create
