import { Octokit } from "https://esm.sh/octokit";

const octokit = new Octokit({});

// octokit.rest.repos => provient du SDK
// get => Méthode du SDK pour récuperer ici les repos
octokit.rest.repos
  .get({ owner: "MayBLG84", repo: "MiniSite-GitHub-Front" })
  .then(({ data }) => {
    console.log("Repo récupéré", data);
    console.log(data.url);
  });
