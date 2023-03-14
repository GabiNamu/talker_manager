const express = require('express');
const fsFuncs = require('./funcsFs');
const generateToken = require('./generateToken');
const validateEmail = require('./middlewares/validateEmail');
const validadePassword = require('./middlewares/validatePassword');
const validateName = require('./middlewares/validateName');
const auth = require('./middlewares/auth');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validatewatchedAt = require('./middlewares/validatewatchedAt');
const validateRate = require('./middlewares/validateRate');

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

app.delete('/talker/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
   const talkers = await fsFuncs.readFile();
   const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
   fsFuncs.writeFile(newTalkers);
   res.status(204).end();
  } catch (err) {
   res.status(500).send({ message: err.message });
  }

})

app.post('/login', validateEmail, validadePassword, (req, res) => {
  try {
    const token = generateToken();
    res.status(200).json({token: token});
 } catch (err) {
    res.status(500).send({ message: err.message });
 }
})
  
// app.post('/talker', 
// auth, 
// validateName, 
// validateAge, 
// validateTalk,
// validateRate,
// validatewatchedAt, 
// async (req, res) => {
//   try {
//   const body = req.body
//   const talkers = await fsFuncs.readFile();
//   const newTalker = { id: talkers[talkers.length - 1].id + 1, ...body };
//   talkers.push(newTalker);
//   fsFuncs.writeFile(talkers);
//   res.status(201).json(newTalker);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// })



app.listen(PORT, () => {
  console.log('Online');
});
