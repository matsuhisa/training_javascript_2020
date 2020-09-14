window.addEventListener('load', () => {
  const items = document.querySelectorAll(".horizontal-scroll__item")
  const steps = document.querySelectorAll(".steps__step")

  const options = {
    root: document.querySelector('#observerArea'),
    rootMargin: "0px 10px 0px 0px",
    threshold: 0
  }

  const observer = new IntersectionObserver(doWhenIntersect, options);
  items.forEach(item => {
    console.log(item)
    observer.observe(item)
  } )

  function doWhenIntersect(entries) {
    entries.forEach(entry => {
      console.log(entry.isIntersecting)
      if(entry.isIntersecting === true) {
        steps.forEach(item => item.setAttribute('aria-current', ""))
        steps[Number(entry.target.getAttribute('data-step')) - 1].setAttribute('aria-current', 'step')
      }
    });
  }
})