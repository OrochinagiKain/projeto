const express = require("express");
const fs = require("fs");
const fetch = require("node-fetch");
const Handlebars = require("handlebars");

const app = express();
// GET
// POST
// PUT
// DELETE
// PATCH
// OPTIONS

const template = fs.readFileSync(`${__dirname}/template.html`, {
  encoding: "utf-8",
});

app.use(express.json());

app.get("/template.html", (req, res) => {
  res.header("content-type", "text/html");
  res.send(template);
});

const templatePath = "https://firebasestorage.googleapis.com/v0/b/projeto-b599b.appspot.com/o/template.html?alt=media&token=e61dcf66-11c4-4443-91a6-1d3a6216cdd4";

app.post("/certificado", async (req, res) => {
  const certificadoText = await fetch(templatePath).then(res => res.text());  
  let text = req.body;  
  const certificado = Handlebars.compile(certificadoText);
  const t = certificado({      
      "studentName":text.studentName,
    "gender":text.gender,
    "courseName":text.courseName, 
    "schoolName":text.schoolName,
    "courseConclusion":text.courseConclusion,
    "schoolDirector":text.schoolDirector,
    "signingDate":text.signingDate
  });
  console.log(t);
  res.header("content-type", "text/html");
  res.send(t);  
});

app.listen(3000, () => console.log("READY"));