// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", { username, password }).then(({ body }) => {
    localStorage.setItem("loggedBloglistUser", JSON.stringify(body));
    cy.visit("http://localhost:3001/");
  });
});

Cypress.Commands.add("newBlog", ({ title, author, url }) => {
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("loggedBloglistUser")).token}`,
    },
  });

  cy.visit("http://localhost:3001");
});

Cypress.Commands.add("updateBlog", (blog) => {
  // console.log(JSON.parse(localStorage.getItem("loggedBloglistUser")).token)
  cy.request({
    url: `http://localhost:3001/api/blogs/${blog.id}`,
    method: "PUT",
    body: {
      user: blog.userId.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes,
    },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("loggedBloglistUser")).token}`,
    },
  });
});
