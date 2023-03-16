const express = require('express');
const talkersRouter = require('./routes/talkersRouter');
const loginRouter = require('./routes/loginRouter');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.use('/talker', talkersRouter);
app.use('/login', loginRouter);

// não remova esse endpoint,  e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, async () => {
  console.log('Online');
});
