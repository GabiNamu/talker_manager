const express = require('express');
const fsFuncs = require('./funcsFs');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcion
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
   try {
    const talkers = await fsFuncs.readFile();
    if(!talkers) {
      return res.status(200).json([]);
    }
    return res.status(200).json(talkers)
   } catch (err) {
    return res.status(500).send({ message: err.message });
   }
})

app.listen(PORT, () => {
  console.log('Online');
});
