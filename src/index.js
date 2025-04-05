const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/cep/:cep", async function (req, res) {
	const address = `https://viacep.com.br/ws/${req.params.cep}/json/`;
	const response = await fetch(address);
	if (response.status !== 200) {
		res.status(400).send({ error: "Invalid CEP" });
		return;
	}
	const data = await response.json();
	res.send(data);
});

app.get("/test-db", async function (req, res) {
	const mysql = require("mysql2");

	const connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});
	connection.connect((err) => {
		if (err) {
			res.status(500).send(err);
			return;
		}
		res.send("Connected to MySQL database");
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
