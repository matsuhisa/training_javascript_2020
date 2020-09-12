window.addEventListener('load', () => {
  function itemsArray() {
    return Array.from(menu.querySelectorAll('.menu-list__menu'))
  }

  function render(targetElement, elementsArray){
    targetElement.textContent = ''
    elementsArray.forEach((element, index) => {
      element.setAttribute('data-order', index)
      targetElement.insertAdjacentElement('beforeend', element)
    })
  }

  function setup(elementsArray) {
    elementsArray.forEach( (item, index) => {
      item.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('order', item.getAttribute('data-order'))
      })

      item.addEventListener('dragover', (event) => {
        event.preventDefault()
        item.classList.add('-dragover')
      })

      item.addEventListener('dragleave', (event) => {
        item.classList.remove('-dragover')
      })

      item.addEventListener('drop', (event) => {
        item.classList.remove('-dragover')

        fromOrder = event.dataTransfer.getData('order')
        list = itemsArray()
        source = list.splice(fromOrder, 1)

        list.splice(item.getAttribute('data-order'), 0, ...source)
        render(menu, list)
      })
    })
  }

  const menu = document.querySelector('.menu-list')
  const items = itemsArray()

  render(menu, items)
  setup(items)
})

