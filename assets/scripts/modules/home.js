import { Octokit, App } from "https://esm.sh/octokit";

class Home {
  constructor() {
    this.descriptionHTML = document.querySelector(".js-home-description");
    this.profileHTML = document.querySelector(".js-home-github-url");
    this.avatarHTML = document.querySelector(".js-home-avatar");
    this.projectsTitle = document.querySelectorAll(".js-home-project-title");
    this.projectsDescription = document.querySelectorAll(
      ".js-home-project-description",
    );
    this.projectsTagContainer = document.querySelectorAll(
      ".js-home-project-tags-container",
    );
    this.init();
  }

  init() {
    // Récuperer les infomations du profil depuis l'API
    this.getUserInformation();
    this.getRepoInformation();
  }

  getUserInformation() {
    // url: https://api.github.com/users/MayBLG84
    // API façon #1 : Récupérer le contenu
    fetch("https://api.github.com/users/MayBLG84")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.updateHTMLUser(data);
      })
      .catch((error) => {
        console.log("Erreurs lors de l'appel api /users/MayBLG84", error);
      });
  }

  async getRepoInformation() {
    // API façon #2 : Récupérer le contenu avec l'Octokit JS + await (async)
    // https://api.github.com/users/MayBLG84/repos
    const octokit = new Octokit();
    const response = await octokit
      .request("GET /users/MayBLG84/repos")
      .catch((error) => {
        console.log("Erreurs lors de l'appel api /users/MayBLG84/repos", error);
      });
    const recentsProjects = response.data.slice(-3);
    //URL pour récuperer les langages d'un projet
    // https://api.github.com/repos/MayBLG84/(nom-du-repo)/languages
    for (let i = 0; i < recentsProjects.length; i++) {
      const languagesUrl = recentsProjects[i].languages_url;
      const clearedUrl = languagesUrl.replace("https://api.github.com", "");
      const responseLanguages = await octokit
        .request(`GET ${clearedUrl}`)
        .catch((error) => {
          console.log(
            "Erreurs lors de l'appel api /repos/MayBLG84/(nom-du-repo)/languages",
            error,
          );
        });
      const projectLanguages = responseLanguages.data;
      recentsProjects[i].languages = projectLanguages;
    }
    this.updateHTMLProjects(response.data);
  }

  updateHTMLUser(APIdata) {
    // Afficher la description de mon profil GitHub
    this.descriptionHTML.textContent = APIdata.bio;
    // Afficher l'url de mon profil GitHub
    this.profileHTML.setAttribute("href", APIdata.html_url);
    // Afficher mon avatar GitHub
    this.avatarHTML.setAttribute("src", APIdata.avatar_url);
  }

  updateHTMLProjects(projects) {
    const maxIndex = projects.length - 1;
    let htmlIndex = 0;
    for (let i = maxIndex; i > maxIndex - 3; i--) {
      const project = projects[i];
      this.projectsTitle[htmlIndex].textContent = project.name;
      this.projectsDescription[htmlIndex].textContent = project.description;
      this.createHTMLLanguageTag(
        this.projectsTagContainer[htmlIndex],
        project.languages,
      );
      htmlIndex++;
    }
  }

  createHTMLLanguageTag(div, languages) {
    const arrayLanguages = Object.keys(languages);
    for (let i = 0; i < arrayLanguages.length; i++) {
      const span = document.createElement("span");
      span.textContent = arrayLanguages[i];
      div.appendChild(span);
    }
    console.log("array", arrayLanguages);
  }
}

export { Home };
