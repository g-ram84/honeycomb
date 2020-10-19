//client side where request are made

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    console.log("users>>>>>>", users)
    for(user of users) {

      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

//use ajax for front end when you dont want to reload page without refreshing like through a button
