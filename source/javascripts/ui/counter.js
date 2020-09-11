window.addEventListener('load', () => {
  const counters = Array.from(document.querySelectorAll('.counter'))

  counters.forEach(counter => {
    // console.log(counter)
    const counterMax = counter.getAttribute('data-max')
    const counterMin = counter.getAttribute('data-min')
    let counterCurrent = Number(counter.getAttribute('data-current'))

    const buttonPlus = counter.querySelector('[data-action="plus"]')
    const buttonMinus = counter.querySelector('[data-action="minus"]')
    const view = counter.querySelector('[data-action="view"]')

    viewBind(view, counterCurrent)

    buttonPlus.addEventListener('click', () => {
      counterCurrent += 1
      viewBind(view, counterCurrent)
    })

    buttonMinus.addEventListener('click', () => {
      counterCurrent -= 1
      viewBind(view, counterCurrent)
    })
  })

  function viewBind(element, count) {
    // const hidden = document.querySelector('input[name="[option][foo]"')
    // hidden.value = count
    element.innerText = ""
    element.innerText = count
  }
})