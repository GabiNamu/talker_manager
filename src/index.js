const express = require('express');
const fsFuncs = require('./funcsFs');
const generateToken = require('./generateToken');
const validateEmail = require('./middlewares/validateEmail');
const validadePassword = require('./middlewares/validatePassword');

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
    console.log(talkers);
    if(!talkers) {
      return res.status(200).json([]);
    }
    return res.status(200).json(talkers)
   } catch (err) {
    return res.status(500).send({ message: err.message });
   }
})

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
    const talkers = await fsFuncs.readFile();
    const talker = talkers.find((talker) => talker.id === Number(id));
    if(talker === undefined) {
      return res.status(404).json({
        "message": "Pessoa palestrante não encontrada"
      });
    }
    return res.status(200).json(talker);
});

app.post('/login', validateEmail, validadePassword, (req, res) => {
  try {
    const token = generateToken();
    res.status(200).json({token: token});
 } catch (err) {
    res.status(500).send({ message: err.message });
 }
})
  
  

app.listen(PORT, () => {
  console.log('Online');
});
