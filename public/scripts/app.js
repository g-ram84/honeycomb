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

<<<<<<< HEAD
//use ajax for front end when you dont want to reload
=======
//use ajax for front end when you dont want to reload page without refreshing like through a button
>>>>>>> 9397d6a61a4095e19838b4398796311b539e1558
