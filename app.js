var express = require('express');
const mysql = require('mysql');
var app = express();

const  port = 3000;
const db_host = 'localhost';
const db_user = 'root';
const db_password = 'q1122';
const db_database = 'smart_home';

app.listen(port, () => console.log(`Smart Home API is Running ${port}!`));

const connection = mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_password,
    database: db_database
});
connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected!');
});
// Motion API
app.get('/motion/get_all_motions', function(req, res) {
    connection.query("SELECT *,DATE_FORMAT(time_stamp,'%l:%i %p, %D %M, %Y') as description FROM security;", (err,rows) => {
        if(err) throw err;
        var data;
        rows.map(function(row,index) {
            row.filename = row.filename.replace('/var/lib/motion/','/motion/image/');
            row.image = row.filename;
            row.id = index+1;
            return row;
        });
        res.json(rows)
    });
});
app.get('/motion/image/:file_name', function (req, res) {
    console.log('/var/lib/motion/'+req.params.file_name);
    res.sendFile('/var/lib/motion/'+req.params.file_name);
});
module.exports = app;
