const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create an S3 instance
const s3 = new aws.S3();

// Configure multer to use S3 for file storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.equip9-testing,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

// Other server configurations and routes will be added later
// POST API to create a record in the table
app.post('/api/records', upload.single('image'), (req, res) => {
  // Retrieve the necessary data from the request body and req.file
  const { firstName, lastName, mobileNo, password } = req.body;
  const imageUrl = req.file ? req.file.location : '';

  // Create a MySQL connection
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Connect to the MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Define the SQL query
      const query =
        'INSERT INTO registration (firstName, lastName, mobileNo, password, imageUrl) VALUES (?, ?, ?, ?, ?)';
      const values = [firstName, lastName, mobileNo, password, imageUrl];

      // Execute the query
      connection.query(query, values, (err, result) => {
        // Handle any errors
        if (err) {
          console.error('Error creating record:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          // Return a success response
          res.json({ message: 'Record created successfully' });
        }

        // Close the MySQL connection
        connection.end();
      });
    }
  });
});
// GET API to retrieve a record from the table
app.get('/api/records/:id', (req, res) => {
  const recordId = req.params.id;

  // Create a MySQL connection
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Connect to the MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Define the SQL query
      const query = 'SELECT * FROM registration WHERE id = ?';
      const values = [recordId];

      // Execute the query
      connection.query(query, values, (err, result) => {
        // Handle any errors
        if (err) {
          console.error('Error retrieving record:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else if (result.length === 0) {
          // If no record found, return an error response
          res.status(404).json({ error: 'Record not found' });
        } else {
          // Return the record data in the response
          res.json(result[0]);
        }

        // Close the MySQL connection
        connection.end();
      });
    }
  });
});
// GET API to retrieve a record from the table
app.get('/api/records/:id', (req, res) => {
  const recordId = req.params.id;

  // Create a MySQL connection
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Connect to the MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Define the SQL query
      const query = 'SELECT * FROM registration WHERE id = ?';
      const values = [recordId];

      // Execute the query
      connection.query(query, values, (err, result) => {
        // Handle any errors
        if (err) {
          console.error('Error retrieving record:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else if (result.length === 0) {
          // If no record found, return an error response
          res.status(404).json({ error: 'Record not found' });
        } else {
          // Return the record data in the response
          res.json(result[0]);
        }

        // Close the MySQL connection
        connection.end();
      });
    }
  });
});
// PUT API to update a record in the table
app.put('/api/records/:id', (req, res) => {
  const recordId = req.params.id;
  const { firstName, lastName, mobileNo, password } = req.body;

  // Create a MySQL connection
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Connect to the MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Define the SQL query
      const query =
        'UPDATE registration SET firstName = ?, lastName = ?, mobileNo = ?, password = ? WHERE id = ?';
      const values = [firstName, lastName, mobileNo, password, recordId];

      // Execute the query
      connection.query(query, values, (err, result) => {
        // Handle any errors
        if (err) {
          console.error('Error updating record:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else if (result.affectedRows === 0) {
          // If no record updated, return an error response
          res.status(404).json({ error: 'Record not found' });
        } else {
          // Return a success response
          res.json({ message: 'Record updated successfully' });
        }

        // Close the MySQL connection
        connection.end();
      });
    }
  });
});

// DELETE API to delete a record from the table
app.delete('/api/records/:id', (req, res) => {
  const recordId = req.params.id;

  // Create a MySQL connection
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Connect to the MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Define the SQL query
      const query = 'DELETE FROM registration WHERE id = ?';
      const values = [recordId];

      // Execute the query
      connection.query(query, values, (err, result) => {
        // Handle any errors
        if (err) {
          console.error('Error deleting record:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else if (result.affectedRows === 0) {
          // If no record deleted, return an error response
          res.status(404).json({ error: 'Record not found' });
        } else {
          // Return a success response
          res.json({ message: 'Record deleted successfully' });
        }

        // Close the MySQL connection
        connection.end();
      });
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

