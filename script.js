function getApiGitHub(){
  fetch('https://api.github.com/users/alexfferro/repos').then( async res => {
    if (!res.ok) {
      throw new Error(res.status)
    }
    var data = await res.json()
    data.map( item => {
      console.log(item.owner)
    })
  }).catch( e => {
    console.log(e)
  })
}

getApiGitHub()