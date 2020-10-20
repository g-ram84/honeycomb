const { getAllContent } = require("../../db/database_functions/database");

  $(document).ready(function() {
    getAllContent();
});


//pull all content
//read media_type
//place resource into proper card (video, picture, text_card)
