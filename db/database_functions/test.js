const dbHelper = require ('./database')

dbHelper.getAllContent()
.then(res => {
console.log(res);

});
