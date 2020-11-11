const express = require("express");
const fetch = require("node-fetch");
const Handlebars = require("handlebars");
const htmlPdf = require("html-pdf");

const app = express();
// GET
// POST
// PUT
// DELETE
// PATCH
// OPTIONS

app.use(express.json());

const templatePath =
  "https://firebasestorage.googleapis.com/v0/b/projeto-b599b.appspot.com/o/template.html?alt=media&token=e61dcf66-11c4-4443-91a6-1d3a6216cdd4";

app.post("/certificado", async (req, res) => {
  const certificadoText = await fetch(templatePath).then((res) => res.text());
  let text = req.body;
  const certificado = Handlebars.compile(certificadoText);
  const t = certificado({
    student: text.student,
    gender: text.gender,
    course: text.course,
    school: text.school,
    courseConclusionDate: text.courseConclusionDate,
    schoolDirector: text.schoolDirector,
    signingDate: text.signingDate,
  });
  htmlPdf.create(t).toStream((_, stream) => {
    res.header("content-type", "application/pdf");
    res.header(
      "content-disposition",
      `attachment; filename="Certificado_${text.student}.pdf"`
    );
    stream.pipe(res);
  });
});

app.listen(process.env.PORT || 3000);
