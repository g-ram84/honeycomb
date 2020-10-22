//Helper function - Changes the character counter displayed at the bottom of the text input.
$(document).ready(function () {

  $("#comment-text").keyup(function () {
    let maxChars = 140;
    let charsLength = $("#comment-text").val().length;
    let charLeftover = maxChars - charsLength;
    const counter = $(this).siblings("div.footer").children('output');
    $(counter).html(charLeftover);
    if (charsLength > 140 || charsLength === 0) {
      $(counter.css('color', 'red'));
      $(counter).html(charLeftover);
    }
    else {
      $(counter.css('color', 'black'));
      $(counter).html(charLeftover);
    }
  });

});


