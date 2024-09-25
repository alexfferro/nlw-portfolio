const username = 'alexfferro'
const repos = document.querySelector('#repos')
const posts = document.querySelector('#posts')

function FetchAPIGitHub(){
  fetch(`https://api.github.com/users/${username}/repos`)
  .then( async res => {
    if(!res.ok) {
      throw new Error(res.status)
    }
    const data = await res.json()
    const limitedData = data.slice(0, 4)

    limitedData.forEach(item => {
      const repoDiv = createRepoElement(item)
      repos.appendChild(repoDiv)
    })
  }).catch(e => console.error(e))
}

function createRepoElement(item){
  const repoDiv = document.createElement('div');
  const repoTitleDiv = document.createElement('div');
  const folderIcon = document.createElement('i');
  const repoTitleSpan = document.createElement('span');
  const repoDescription = document.createElement('p');
  const statusDiv = document.createElement('div');
  const gitDiv = document.createElement('div');
  const starDiv = document.createElement('div');
  const starIcon = document.createElement('i');
  const starSpan = document.createElement('span');
  const branchDiv = document.createElement('div');
  const branchIcon = document.createElement('i');
  const branchSpan = document.createElement('span');
  const jsDiv = document.createElement('div');
  const jsIcon = document.createElement('i');
  const progLangDiv = document.createElement('div');
  repoDiv.classList.add('repo');
  repoTitleDiv.classList.add('repo-title');
  folderIcon.classList.add('ph', 'ph-folder');
  repoTitleDiv.appendChild(folderIcon);
  repoTitleSpan.textContent = item.name;
  repoTitleDiv.appendChild(repoTitleSpan);
  repoDiv.appendChild(repoTitleDiv);
  repoDescription.textContent = item.description;
  repoDiv.appendChild(repoDescription);
  statusDiv.classList.add('status');
  gitDiv.classList.add('git');
  starIcon.classList.add('ph', 'ph-star');
  starDiv.appendChild(starIcon);
  starSpan.textContent = item.stargazers_count;
  starDiv.appendChild(starSpan);
  gitDiv.appendChild(starDiv);
  branchIcon.classList.add('ph', 'ph-git-branch');
  branchDiv.appendChild(branchIcon);
  branchSpan.textContent = item.forks_count;
  branchDiv.appendChild(branchSpan);
  gitDiv.appendChild(branchDiv);
  statusDiv.appendChild(gitDiv);
  progLangDiv.classList.add('prog-lang');
  jsIcon.classList.add('ph', 'ph-circle');
  jsDiv.appendChild(jsIcon);
  const jsSpan = document.createElement('span');
  jsSpan.textContent = item.language;
  jsDiv.appendChild(jsSpan);
  progLangDiv.appendChild(jsDiv);
  statusDiv.appendChild(progLangDiv);
  repoDiv.appendChild(statusDiv);
  repos.append(repoDiv)
  return repoDiv
}

FetchAPIGitHub()