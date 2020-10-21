

//client side where request are made

$(document).ready(function() {
  console.log(`app loaded`)
  $("#inputGroupSelect02").change(function(){
    let cat = $("#inputGroupSelect02").val();
    console.log(`clicked :${$("#inputGroupSelect02").val()}`)
    window.location.href =`http://localhost:8080/api/resources?category=${cat}`
  })
});

