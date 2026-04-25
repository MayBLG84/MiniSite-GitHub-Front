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
    const octokit = new Octokit();
    // https://api.github.com/users/MayBLG84/repos
    const response = await octokit
      .request("GET /users/MayBLG84/repos")
      .catch((error) => {
        console.log("Erreurs lors de l'appel api /users/MayBLG84/repos", error);
      });
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
      const languages = project.topics;
      console.log(languages);
      htmlIndex++;
    }
  }
}

export { Home };
