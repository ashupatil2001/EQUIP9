
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ashish@123',
  database:'equip9',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
    return;
  }
  console.log('Connected to MySQL database!');
});
module.exports = connection;