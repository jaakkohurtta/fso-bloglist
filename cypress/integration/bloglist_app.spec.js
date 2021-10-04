describe("Bloglist app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    const testUser = {
      name: "Test User",
      username: "testuser",
      password: "test123",
    };
    const testUser2 = {
      name: "Test User 2",
      username: "testuser2",
      password: "test123",
    };

    cy.request("POST", "http://localhost:3001/api/users", testUser);
    cy.request("POST", "http://localhost:3001/api/users", testUser2);

    cy.visit("http://localhost:3001");
  });

  describe("Users", () => {
    it("User can sign up", function () {
      cy.contains("sign up >").click();
      cy.get("#signupName").type("Test User 3");
      cy.get("#signupUsername").type("testuser3");
      cy.get("#signupPassword").type("test123");
      cy.get("#submitSignupBtn").click();

      cy.contains("testuser3 signed up succesfully");
    });

    it("Login form is shown", () => {
      cy.contains("login >").click();
    });
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login >").click();
      cy.get("#loginUsername").type("testuser");
      cy.get("#loginPassword").type("test123");
      cy.get("#loginBtn").click();

      cy.contains("Test User logged in.");
    });
    it("fails with incorrect credentials", function () {
      cy.contains("login >").click();
      cy.get("#loginUsername").type("testuser");
      cy.get("#loginPassword").type("test1234");
      cy.get("#loginBtn").click();

      cy.contains("Invalid username or password.");
      cy.get("html").should("not.contain", "Logged in as Test User");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "test123" });
    });

    it("a new blog can be added", function () {
      cy.newBlog({
        title: "A New Test Blog",
        author: "John Doe",
        url: "http://www.anewtestblog.com",
      });

      cy.contains("A New Test Blog");
    });

    it("a blog like is registered as expected", function () {
      cy.newBlog({
        title: "A New Test Blog",
        author: "John Doe",
        url: "http://www.anewtestblog.com",
      });

      cy.contains("A New Test Blog").click();
      cy.get("#likeBtn").click();
      cy.contains("likes: 1");
    });

    it("a user who added a blog can delete it", function () {
      cy.newBlog({
        title: "A New Test Blog",
        author: "John Doe",
        url: "http://www.anewtestblog.com",
      });

      cy.contains("A New Test Blog").click();
      cy.get("#deleteBtn").click();
      // eslint-disable-next-line quotes
      cy.contains('"A New Test Blog" deleted.');
    });

    it("a user can not delete a blog he did not add", function () {
      cy.newBlog({
        title: "A New Test Blog",
        author: "John Doe",
        url: "http://www.anewtestblog.com",
      });

      cy.login({ username: "testuser2", password: "test123" }).then(() => {
        let blog;
        cy.request("GET", "http://localhost:3001/api/blogs").then((res) => {
          blog = res.body[0];

          // console.log(blog)

          cy.request({
            url: `http://localhost:3001/api/blogs/${blog.id}`,
            method: "DELETE",
            body: blog,
            headers: {
              Authorization: `bearer ${JSON.parse(localStorage.getItem("loggedBloglistUser")).token}`,
            },
            failOnStatusCode: false,
          }).then((response) => {
            // console.log(response.status)
            expect(response.status).to.be.equal(401);
          });
        });
      });
    });

    it("blogs are sorted correctly based on likes", function () {
      cy.newBlog({
        title: "A New Test Blog",
        author: "John Doe",
        url: "http://www.anewtestblog.com",
      });
      cy.newBlog({
        title: "A New Test Blog 2",
        author: "John Doe",
        url: "http://www.anewtestblog2.com",
      });
      cy.newBlog({
        title: "A New Test Blog 3",
        author: "John Doe",
        url: "http://www.anewtestblog3.com",
      });

      let blogs;
      cy.request("GET", "http://localhost:3001/api/blogs")
        .then((response) => {
          blogs = response.body;
          blogs[0].likes = 10;
          blogs[1].likes = 35;
          blogs[2].likes = 22;

          // console.log(blogs)

          cy.updateBlog(blogs[0]);
          cy.updateBlog(blogs[1]);
          cy.updateBlog(blogs[2]);
        })
        .then(() => {
          cy.request("GET", "http://localhost:3001/api/blogs").then((response) => {
            blogs = response.body;
            console.log(blogs);
            cy.visit("http://localhost:3001/").then(() => {
              cy.get(".blog-container").eq(0).contains("A New Test Blog 2");
              cy.get(".blog-container").eq(1).contains("A New Test Blog 3");
              cy.get(".blog-container").eq(2).contains("A New Test Blog");
            });
          });
        });
    });
  });
});
