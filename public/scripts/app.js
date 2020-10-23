

//client side where request are made

$(document).ready(function() {
  // console.log(`app loaded`)
  // This function is for Blank
  $("#inputGroupSelect02").change(function(){
    let cat = $("#inputGroupSelect02").val();
    console.log(`clicked :${$("#inputGroupSelect02").val()}`)
    window.location.href =`http://localhost:8080/api/resources?category=${cat}`
  })

// This function is for ratings
  console.log(`app loaded`)
  $("#ratings").change(function(){
    let rat = $("#ratings").val();
    console.log(`clicked :${$("#ratings").val()}`)
    .then((res) => {
      const newRating = {
        rating: rat,
        resource_id: 1,
        user_id: 1
      }
      addRating(newRating)
    })
  })

  // This function is for adding rating
$('#rating_id').submit(function (event){
event.preventDefault() //no refresh
let formID = $('#rating_id').attr('data-formID');
let selectedRating = $('#rating_id option:selected').text();
console.log(selectedRating)
$.ajax({
  type: "POST",
  url: `/api/resources/${formID}/rating`,
  data: { selectedRating },
  success: "Sent",
  error: "Error"
}).then(
  console.log("sENT!")

).catch(
  console.log("fail to sent")
);

})


});




