document.getElementById('openMenu').addEventListener('click', function() {
  document.getElementById('left-side').classList.add('open');
  document.getElementById('overlay').classList.add('show');
  document.body.classList.add('noscroll');
});

document.getElementById('closeMenu').addEventListener('click', function() {
  document.getElementById('left-side').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  document.body.classList.remove('noscroll');
});

document.getElementById('overlay').addEventListener('click', function() {
  document.getElementById('left-side').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  document.body.classList.remove('noscroll'); // Permitir scroll do fundo novamente
});

const username = 'alexfferro'
const repos = document.querySelector('#repos')
const posts = document.querySelector('#posts')

function calcularIntervaloDeTempo(dataPostagem) {
  // Cria objetos Date para a data do post e a data atual
  const dataPost = new Date(dataPostagem);
  const hoje = new Date();

  // Calcula a diferença em milissegundos
  const diferencaEmMilissegundos = hoje - dataPost;

  // Converte milissegundos para dias (aproximado)
  const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
  const dias = Math.floor(diferencaEmMilissegundos / umDiaEmMilissegundos);

  // Define intervalos e mensagens correspondentes
  const umAnoEmDias = 365;
  const umMesEmDias = 30; // Aproximação para simplificar
  const umDia = 1;

  let intervalo;
  if (dias >= umAnoEmDias) {
      intervalo = Math.floor(dias / umAnoEmDias);
      return intervalo > 1 ? `${intervalo} anos atrás` : `${intervalo} ano atrás`;
  } else if (dias >= umMesEmDias) {
      intervalo = Math.floor(dias / umMesEmDias);
      return intervalo > 1 ? `${intervalo} meses atrás` : `${intervalo} mês atrás`;
  } else if (dias >= umDia) {
      return `${dias} dias atrás`;
  } else {
      // Calcula a diferença em horas
      const horas = Math.floor((diferencaEmMilissegundos % umDiaEmMilissegundos) / (1000 * 60 * 60));
      return `${horas} horas atrás`;
  }
}
function createRepoElement(item){
  const repoDiv = document.createElement('a');
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
  const jsSpan = document.createElement('span');
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
  jsSpan.textContent = item.language;
  jsDiv.appendChild(jsSpan);
  progLangDiv.appendChild(jsDiv);
  statusDiv.appendChild(progLangDiv);
  repoDiv.appendChild(statusDiv);
  repos.append(repoDiv)
  repoDiv.href = item.html_url;
  repoDiv.target ='_blank';
  return repoDiv
}
function createPostElement(item){
  const postDiv = document.createElement('div');
  const postAvatarDiv = document.createElement('div');
  const avatarImg = document.createElement('img');
  const postContentDiv = document.createElement('div');
  const postTitleDiv = document.createElement('div');
  const postTitleH2 = document.createElement('h2');
  const postDateSpan = document.createElement('span');
  const postDetailDiv = document.createElement('div');
  const postDetailP = document.createElement('p');
  const postTagsDiv = document.createElement('div')
  postDiv.classList.add('post');
  postAvatarDiv.classList.add('post-avatar');
  avatarImg.src = 'https://avatars.githubusercontent.com/alexfferro'; // Replace with actual avatar URL
  avatarImg.alt = 'foto de perfil do Alex com o léo no colo'; // Replace with actual alt text
  postAvatarDiv.appendChild(avatarImg);
  postDiv.appendChild(postAvatarDiv);
  postContentDiv.classList.add('post-content');
  postTitleDiv.classList.add('post-title');
  postTitleH2.textContent = item.message;
  postDateSpan.textContent = calcularIntervaloDeTempo(item.createdAt); // Adjust date string as needed
  postTitleDiv.appendChild(postTitleH2);
  postTitleDiv.appendChild(postDateSpan);
  postContentDiv.appendChild(postTitleDiv);
  postDetailDiv.classList.add('post-detail');
  postDetailP.textContent = item.message;
  postDetailDiv.appendChild(postDetailP);
  postContentDiv.appendChild(postDetailDiv);
  postDiv.appendChild(postContentDiv);
  postTagsDiv.classList.add('post-tags');
  for (const tag of item.tags) {
    const tagSpan = document.createElement('span');
    tagSpan.textContent = `#${tag}`;
    postTagsDiv.appendChild(tagSpan);
  }
  postDetailDiv.appendChild(postTagsDiv);
  return postDiv;
}
async function fetchGitHubCommits(username, maxCommits = 4) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/events`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar eventos do usuário: ${response.status}`);
    }

    const data = await response.json();
    const commits = data.filter(item => item.type === 'PushEvent').slice(0, maxCommits);

    const promises = commits.map(async (commit) => {
      try {
        const repoResponse = await fetch(commit.repo.url);

        if (!repoResponse.ok) {
          throw new Error(`Erro ao buscar informações do repositório ${commit.repo.name}: ${repoResponse.status}`);
        }

        const repoData = await repoResponse.json();
        return {
          message: commit.payload.commits[0].message,
          repoName: commit.repo.name,
          repoUrl: commit.repo.url,
          tags: repoData.topics,
          createdAt: commit.created_at
        };
      } catch (error) {
        console.error(`Erro ao buscar tags para o commit ${commit.payload.commits[0].sha}: ${error.message}`);
        return {
          commitHash: commit.payload.commits[0].sha,
          error: error.message
        };
      }
    });

    const postsGitHub = await Promise.all(promises);

    postsGitHub.forEach(post => {
      const postDiv = createPostElement(post); // Assuma que createPostElement recebe um objeto com as informações do post
      posts.append(postDiv);
    });
  } catch (error) {
    console.error('Erro geral:', error);
  }
}
function FetchGitHubPosts(){
  fetch(`https://api.github.com/users/${username}/repos`)
  .then( async res => {
    if(!res.ok) {
      throw new Error(res.status)
    }
    const data = await res.json()
    const limitedData = data.slice(1, 5)

    limitedData.forEach(item => {
      const repoDiv = createRepoElement(item)
      repos.appendChild(repoDiv)
    })
  }).catch(e => console.error(e))
}

fetchGitHubCommits(username, 4)
FetchGitHubPosts()

