if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready () {
    getBlogposts("/posts");
    // send posts to server
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // prevents the form from contacting our server automatically (we want to do it ourselves)
        var formActionUrl = form.action; // 'form.action' is the url '/create-post'
        var formData = new FormData(form);
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
            var postDiv = document.createElement("div");
            var postText = document.createElement("p");
            var thumbnail = document.createElement("img");
            var postContainer = document.querySelector(".post-container");

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