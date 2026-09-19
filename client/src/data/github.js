// EDIT THIS FILE to configure the GitHub section.
// If "username" is set, the section fetches public repos live from GitHub's API
// (no token required, since it only reads public data).
// "fallbackRepos" is shown if the API request fails or username is blank —
// keep it in sync with your real, actual repositories.
export const githubConfig = {
  username: "", // e.g. "your-username" — leave blank to skip the live fetch and use fallbackRepos
  fallbackRepos: [
    // {
    //   name: "portfolio",
    //   description: "My personal portfolio website.",
    //   language: "JavaScript",
    //   stars: 0,
    //   forks: 0,
    //   url: "https://github.com/your-username/portfolio",
    // },
  ],
};
