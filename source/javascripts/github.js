window.onload = async function() {
  const github = document.getElementById('github_issues')
  const apiUrl = 'https://api.github.com/repos/rails/rails/issues'

  if( github ) {
    const json = await githubIssues()
    await json.forEach(record => github.insertAdjacentHTML('afterbegin', template(record))) 

    const taskTogles = document.querySelectorAll('.task__comment-icon')
    const tasks = document.querySelectorAll('.task')
    // const tasks = document.getElementsByClassName('task')
    Array.from(taskTogles).forEach( toglePin => {
      toglePin.addEventListener('click', (event) => {
        const number = event.currentTarget.getAttribute('data-task-number')
        const element = Array.from(tasks).find( task => task.getAttribute('data-task-number') === `${number}` )
        if(element.getAttribute('aria-selected') === 'true') {
          element.setAttribute('aria-selected', false)
        } else {
          element.setAttribute('aria-selected', true)
        }
        event.preventDefault()
      } )
    })
  }

  async function githubIssues() {
    const response = await fetch(apiUrl)
    if(response.status == 200) {
      return await response.json()
    }else{
      throw Error(response.statusText)
    }  
  }

  function template(record) {
    return `
<a aria-selected="false" class="task" data-state="open" href="${record.html_url}" data-task-number="${record.number}">
<div class="task__user">
  <img class="task__user-avatar" src="${record.user.avatar_url}">
</div>
<div class="task__body">
  <h2 class="task__headline">
    <span class="task__headline-title">${record.title}</span>
  </h2>
<div class="task__information">
  <div class="task__information-state">${record.state}</div>
  <div class="task__information-number">#${record.number}</div>
  <div class="task__information-created-at">${record.created_at}</div>
  <div class="task__information-user-name">${record.user.login}</div>
</div>
</div>
<div class="task__comment">
  <span class="material-icons task__comment-icon" data-task-number="${record.number}">push_pin</span>
</div>
</a>
    `
  }
}
