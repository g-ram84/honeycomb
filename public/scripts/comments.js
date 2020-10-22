//~~~~~~~~~~~~~~~~~~~~~~TWEETTER~~~~~~~~~~~~~~~~~~~~~~~

//tweeter stuff brought in : from tweeter/public/ scripts
// - createCommentElement - a function to create comment the html mady need changing
// - renderComments - a function that takes in an object of comments and renders them to the page
// - comment submission and error handling for the submission process. eg. more than 140 or 0 characters and hides errors from page until needed
// - loadComments - AJAX request function that 'GET's from the comment database and loads the comments to the page.
// - loadsComments - No comment database so dbHandler?
// - escape - malicious code injection protection
// - timeSince - time since comment was made takes in a date eg. Now()


// Creates a new HTML element and returns a tweet given the user input.
$(document).ready(function () {

  const createCommentElement = function (comment) {

    return $(`
      <p id="comment-body">
      ${escape(JSON.stringify(comment['comment']))}
      </p>

    `);
  };
// adds my created comment and renders said comment with the renderComments function
  const addCommentToPage = () => {
    $("#submit-button").click(function () {
      console.log("onCLICK");
      renderComments();
    });
  };
  addCommentToPage();

//
  const renderComments = function () {
    // $("#comments-container").empty();
    const $comment = createCommentElement($('#comment-text').val());
    $('#comments-container').prepend($comment);
  };
// make an on submit event slistener

// post requestresources/id/comments save the correct comment with that add Comment function respond res.send ok
// on front end container empty rerun get comments ajax request to get comments and for loop to populate again
//   with resource id

  // Form submission and error handling for the submission process.
  const errorEmpty = $("#comment-text").siblings(".error-empty");
  const error140 = $("#comment-text").siblings(".error-140");
  $("form").submit(function (event) {
    event.preventDefault();
    const charsLength = $("#comment-text").val().length;
    console.log(charsLength);

    if (charsLength > 140) {
      $(error140).slideDown(2000);
      $(error140).slideUp(2000);

    } else if (charsLength === 0) {
      $(errorEmpty).slideDown(2000);
      $(errorEmpty).slideUp(2000);


    } else {
      $.post("/api/resources/:id", //FIX THIS AREA TOO
        $("form").serialize()
      ).then(() => {
        loadComments();
        $(error140).hide();
        $(errorEmpty).hide();
      });
    }
  });
  // The form submission error handlers are default hidden from the page.
  $(error140).hide();
  $(errorEmpty).hide();

  //  AJAX request function that fetches from the comment database and loads the comments to the page.
  const loadComments = function () {
    console.log("whatsgoing on");
    $.ajax({
      method: 'GET',
      url: `/api/resources/${window.location.pathname.split("/")[window.location.pathname.split("/").length -1]}/comments`
    }).then((response) => {
      console.log("response>>>>>",response)
      for (let comment of response) {
        const commenthtml = createCommentElement(comment)
        $('#comments-container').prepend(commenthtml);
      }
    }).catch((error) => {
      alert(error);
    }
    );
  };
  loadComments();

  // Protection incase of malicious code entered into input fields and converts to text
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // This function I found on stack overflow. I know you're not supposed to copy/paste but
  // the function works flawlessly and could not see any way to make it my own.
  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

});


//copied across directly from tweeter index.html because comment-text is referenced in here
//for our reference
/*
 <main class="container">
      <section class="new-tweet">
        <h2>Compose Tweet</h2>
        <form method="post" action="/tweets">
          <label for="comment-text">What are you humming about?</label>
          <div class="error-empty"><p>Your tweet is empty!</p></div>
          <div class="error-140"><p>Your tweet needs to be less than 140 characters!</p></div>
          <textarea name="text" id="-text"></textarea>
          <div class="footer">
            <button id="submit-button"type="submit">Tweet</button>
            <output id="textAreaOutput" name="counter" class="counter" for="comment-text">140</output>
          </div>
        </form>
      </section>
      <div id="tweets-container">
      </div>
    </main>


    .comment_button
*/

// http://localhost:8080/api/resources/10/comments
