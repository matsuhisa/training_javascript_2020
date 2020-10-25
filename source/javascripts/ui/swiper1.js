window.addEventListener('load', () => {
  const swiper = document.querySelector('[data-ui="swiper"]')
  if(swiper) {
    const items = swiper.querySelectorAll('[data-ui="swiper-slide"]')
    const pagination = swiper.querySelector('[data-ui="swiper-pagination"]')
    const prevButton = swiper.querySelector('[data-ui="swiper-prev"]')
    const nextButton = swiper.querySelector('[data-ui="swiper-next"]')
    let currentIndex = 0

    // if(prevButton) {
    //   prevButton.addEventListener('click', () => {
    //     let index = currentIndex - 1
    //     currentIndex = (index >= 0 && items.length > index) ? index:0
    //     console.log(items[currentIndex])
    //   })
    // }

    // if(nextButton) {
    //   nextButton.addEventListener('click', () => {
    //     let index = currentIndex + 1
    //     currentIndex = (index >= 0 && items.length > index) ? index:0
    //     console.log(items[currentIndex])
    //   })
    // }

    // 現在地表示 の HTML生成
    if(pagination) {
      for(let i = 1; i <= items.length; i ++) {
        className = i === 1 ? 'swiper-pagination__bullet -active':'swiper-pagination__bullet'
        html = `<span class="${className}" tabindex="0" data-swiper-bullet="${i-1}" role="button" aria-label="Go to slide ${i}"></span>`
        pagination.insertAdjacentHTML('beforeend', html)
      }
    }
    const bullets = swiper.querySelectorAll('[data-swiper-bullet]')

    // 移動とaction
    const options = {
      root: swiper,
      rootMargin: "0px -50%",
      threshold: 0
    }

    const observer = new IntersectionObserver(doWhenIntersect, options)
    items.forEach( (item, index) => {
      item.setAttribute('data-swipe-item', index)
      item.setAttribute('id', `data-swipe-item-${index}`)
      observer.observe(item) // 監視を設定
    })

    if(prevButton) {
      prevButton.addEventListener('click', () => {
        let index = currentIndex - 1
        currentIndex = (index >= 0 && items.length > index) ? index:0
        items[currentIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }

    if(nextButton) {
      nextButton.addEventListener('click', () => {
        let index = currentIndex + 1
        currentIndex = (index >= 0 && items.length > index) ? index:0
        items[currentIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }

    function doWhenIntersect(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let index = Number(entry.target.getAttribute('data-swipe-item'))
          currentIndex = index
          console.log(index)

          // 現在地表示の変更
          bullets.forEach(bullet => {
            bullet.classList.remove('-active')
          })
          bullets.forEach(bullet => {
            if(bullet.getAttribute('data-swiper-bullet') == index){
              bullet.classList.add('-active')
            }
          })

          // prev/next の設定

        }
      })
    }

  }
})