const mysql = require("mysql2");
const express = require("express");
let app = express();
const cors = require("cors");
app.use(cors());
let myConnection = mysql.createConnection({
  user: "myDBuser",
  password: "123456",
  host: "localhost",
  database: "myDB",
});
myConnection.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to DB!");
  }
});
const port = 3001;
app.listen(port, (err) => {
  if (err) console.log(err.message);
  else console.log(`Server running at http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/iphones", (req, res) => {
  myConnection.query(
    `SELECT * 
FROM Products 
JOIN Product_description ON Products.Product_ID = Product_description.Product_ID
JOIN Product_price ON Products.Product_ID = Product_price.Product_ID;
`,
    (err, results, fields) => {
      if (!err) res.json(results);
      else console.log("Error Found", err);
    }
  );
});

//nodemon app.js once i opened my terminal on the package.json of the server project
