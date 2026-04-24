class Home {
  constructor() {
    this.descriptionHTML = document.querySelector(".js-home-description");
    this.profileHTML = document.querySelector(".js-home-github-url");
    this.avatarHTML = document.querySelector(".js-home-avatar");
    this.init();
  }

  init() {
    // Récuperer les infomations du profil depuis l'API
    this.getUserInformation();
  }

  getUserInformation() {
    //url: https://api.github.com/users/MayBLG84
    // API façon #1 : Récupérer le contenu
    fetch("https://api.github.com/users/MayBLG84")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.updateHTML(data);
      })
      .catch((error) => {
        console.log("Erreurs lors de l'appel api", error);
      });
  }

  updateHTML(APIdata) {
    // Afficher la description de mon profil GitHub
    this.descriptionHTML.textContent = APIdata.bio;
    // Afficher l'url de mon profil GitHub
    this.profileHTML.setAttribute("href", APIdata.html_url);
    // Afficher mon avatar GitHub
    this.avatarHTML.setAttribute("src", APIdata.avatar_url);
  }
}

export { Home };
