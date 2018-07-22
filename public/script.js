if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready () {
    getBlogposts("/posts");
    // send posts to server
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // prevents the form from contacting our server automatically (we want to do it ourselves)
        const formActionUrl = form.action; // 'form.action' is the url '/post'
        const formData = new FormData(form);
        postBlogposts(formActionUrl, formData);
    });

}

/****
 * Function definitions
 ***/
function postBlogposts(url, data) {
  fetch(url, {
    method: "POST",
    body: data
  })
    .then(function(res) {
      res.json().then(function(json) {
        addBlogpostsToPage(json);
        document.querySelector("form").reset();
        window.location.href = "http://localhost:3000/"
      });
    })
    .catch(function(err) {
      console.error(err);
    });
}

function getBlogposts(url) {
    fetch(url, {
        method: 'GET'
    })
    .then(function (res) {
        res.json()
        .then(function (json) {
            addBlogpostsToPage(json);
        });
    })
    .catch(function (err) {
        console.error(err)
    });
}

function addBlogpostsToPage (data) {
    JSON.parse(data).map(post => {  
          if (post.hasOwnProperty("blogpost")) {
            const postDiv = document.createElement("div");
            const postText = document.createElement("p");
            const thumbnail = document.createElement("img");
            const postContainer = document.querySelector(".post-container");

            thumbnail.src = "./img/logo2.png";
            thumbnail.className = "thumbnail";
            postText.innerHTML = post.blogpost;
            postDiv.className = "post";

            postDiv.appendChild(thumbnail);
            postDiv.appendChild(postText);
            postContainer.appendChild(postDiv);
          }
    })   
}