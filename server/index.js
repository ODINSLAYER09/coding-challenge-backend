const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a user

app.post("/users", async (req, res) => {
  try {
    const { firstname, lastname, email, homecurrency } = req.body;
    const newUser = await pool.query(
      "INSERT INTO userinfo(first_name, last_name, email, home_currency) VALUES($1, $2, $3, $4) RETURNING *",
      [firstname, lastname, email, homecurrency]
    );
    res.json(newUser.rows[0]);
    console.log(req.body);
  } catch (err) {
    const { email } = req.body;
    res.json(email + " already exists");
    console.error(err.message);
  }
});

//get all users

app.get("/allusers", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM userinfo");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a user

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM userinfo WHERE email = $1", [
      id,
    ]);
    res.json(user.rows[0]);
    console.log(req.params);
  } catch (err) {
    const { id } = req.params;
    res.json(id + " already exists");
    console.error(err.message);
  }
});

//update a user's home currency

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { homecurrency } = req.body;
    const updateCurrency = await pool.query(
      "UPDATE userinfo SET home_currency = $1 WHERE email = $2",
      [homecurrency, id]
    );
    res.json("Home currency was updated");
  } catch (err) {
    const { id } = req.params;
    res.json("could not update home currency for user" + id);
    console.error(err.message);
  }
});

//new transaction

app.post("/transaction", async (req, res) => {
  try {
    const {
      fromemail,
      fromamount,
      fromhomecurrency,
      transactiondate,
      toemail,
      toamount,
      tohomecurrency,
      conversionrate,
      transactionnotes,
    } = req.body;
    const newTransaction = await pool.query(
      "INSERT INTO transactions(s_email, s_amount, s_home_currency, transaction_date, r_email, r_amount, r_home_currency, conversion_rate, t_notes) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        fromemail,
        fromamount,
        fromhomecurrency,
        transactiondate,
        toemail,
        toamount,
        tohomecurrency,
        conversionrate,
        transactionnotes,
      ]
    );
    res.json(newTransaction.rows[0]);
    console.log(req.body);
  } catch (err) {
    res.json("could not process this transaction");
    console.error(err.message);
  }
});

//get all transactions by user
app.get("/transaction/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTransactions = await pool.query(
      "SELECT * FROM transactions WHERE s_email = $1 OR r_email = $1",
      [id]
    );
    res.json(allTransactions.rows);
  } catch (err) {
    res.json("could not process this request");
    console.error(err.message);
  }
});

//get all transactions

app.get("/transaction", async (req, res) => {
  try {
    const { id } = req.params;
    const allTransactions = await pool.query("SELECT * FROM transactions");
    res.json(allTransactions.rows);
  } catch (err) {
    res.json("could not process this request");
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
