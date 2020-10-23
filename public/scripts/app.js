

//client side where request are made
//
$(document).ready(function() {
  // console.log(`app loaded`)
  // This function is for Blank
  $("#inputGroupSelect02").change(function(){
    let cat = $("#inputGroupSelect02").val();
    console.log(`clicked :${$("#inputGroupSelect02").val()}`)
    window.location.href =`http://localhost:8080/api/resources?category=${cat}`
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

//need and event listiner
// This function is for getting a user_id
// $('#my_resources').on('click',function (event) {
//   event.preventDefault() //no refresh
// console.log('you clicked me')
// const user_id = 1; //math.random for 1-3?


//   $.ajax({
//     type: "GET",
//     url: `/api/resources/${user_id}/myresources`,
//     data: user_id,
//     success: "Sent",
//     error: "Error"
//   }).then( (res) => {

//     console.log("SENT!", res)
//   }

//   ).catch((err) => {

//     console.log("fail to send",err)

//   }
//   );
//   })
});

