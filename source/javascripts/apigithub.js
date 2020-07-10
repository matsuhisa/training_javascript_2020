window.addEventListener('load', async () => {
  const apiURL = 'https://api.github.com/repos/rails/rails/issues'
  const app = document.getElementById('app')

  const response = await fetch(apiURL)
  if(response.status == 200) {
    const json = await response.json()
    await json.forEach(record => app.insertAdjacentHTML('afterbegin', template(record))) 
  }else{
    console.log('失敗')
  }

  const tasks = document.getElementsByClassName('task')
  for()
})

function template(record) {
  return `<img class="foo" src="${record.user.avatar_url}">`
}
