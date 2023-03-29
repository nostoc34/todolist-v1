const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

const items = [];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  let currentDate = date.getDate();
  res.render("list", { listTitle: currentDate, newListItems: items});
});

app.post("/", (req, res) => {
	if (req.body.list === "Work") {
		workItems.push(req.body.newItem);
		res.redirect("/work");
	} else {
		items.push(req.body.newItem);    
		res.redirect("/");
	}    
})

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.listen(5000, () => {
  console.log("Server started running on port 5000.");
});
