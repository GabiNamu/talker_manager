const express = require('express');
const fsFuncs = require('../utils/funcsFs');
const validateName = require('../middlewares/validateName');
const auth = require('../middlewares/auth');
const validateAge = require('../middlewares/validateAge');
const validateQueryRate = require('../middlewares/validateQueryRate');
const validateQueryWatchedAt = require('../middlewares/validateQueryWatchedAt');
const validateReqRate = require('../middlewares/validateReqRate');
const { findAll } = require('../db/talkersDB');
const { validateTalk, validateRate, validateWatchedAt } = require('../middlewares/validateTalk');
const {
  validateParamnsQ,
  validateParamsRate,
  validateParsmsDate,
  validateParamsRateQ,
  validateParamsQDate,
  validateParamsRateDate,
} = require('../middlewares/validateSearch');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
     const talkers = await fsFuncs.readFile();
     console.log(talkers);
     if (!talkers) {
       return res.status(200).json([]);
     }
     return res.status(200).json(talkers);
    } catch (err) {
     return res.status(500).send({ message: err.message });
    }
 });
 
 router.get('/search', auth, validateQueryRate, validateQueryWatchedAt, 
 validateParamnsQ, validateParamsRate, 
 validateParsmsDate, validateParamsRateQ, 
 validateParamsQDate, validateParamsRateDate, async (req, res) => {
   const { q, rate, date } = req.query;
   const talkers = await fsFuncs.readFile();
   if (!q && !rate && !date) {
     return res.status(200).json(talkers);
   }
   const filteredTalkers = talkers
     .filter((t) => t.name.toLowerCase().includes(q.toLowerCase())
      && t.talk.rate === Number(rate) && t.talk.watchedAt === date);
     return res.status(200).json(filteredTalkers);
 });
 
 router.get('/db', async (req, res) => {
   const [result] = await findAll();
   if (!result) {
     return res.status(200).json([]);
   }
   const formatResult = result.map((t) => ({
     age: t.age,
     id: t.id,
     name: t.name,
     talk: {
       rate: t.talk_rate,
       watchedAt: t.talk_watched_at,
     },
   }));
   res.status(200).json(formatResult);
 });
 
 router.get('/:id', async (req, res) => {
   const { id } = req.params;
     const talkers = await fsFuncs.readFile();
     const talker = talkers.find((t) => t.id === Number(id));
     if (talker === undefined) {
       return res.status(404).json({
         message: 'Pessoa palestrante não encontrada',
       });
     }
     return res.status(200).json(talker);
 });
 
 router.delete('/:id', auth, async (req, res) => {
   const { id } = req.params;
   try {
    const talkers = await fsFuncs.readFile();
    const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
    fsFuncs.writeFile(newTalkers);
    res.status(204).end();
   } catch (err) {
    res.status(500).send({ message: err.message });
   }
 });
 
 router.patch('/rate/:id', auth, validateReqRate, async (req, res) => {
   const { id } = req.params;
   const { rate } = req.body;
   const talkers = await fsFuncs.readFile();
   const index = talkers.findIndex((talker) => talker.id === Number(id));
     if (index === -1) {
       return res.status(404).json({
         message: 'Pessoa palestrante não encontrada',
       });
     }
     talkers[index].talk.rate = rate;
     fsFuncs.writeFile(talkers);
   res.status(204).end();
 });
 
 router.use(auth);
 router.use(validateName);
 router.use(validateAge);
 router.use(validateTalk);
 router.use(validateWatchedAt);
 router.use(validateRate);
   
 router.post('/', async (req, res) => {
   const { name, age, talk } = req.body;
   const talkers = await fsFuncs.readFile();
   const newTalker = { id: talkers.length + 1, name, age, talk };
   talkers.push(newTalker);
   await fsFuncs.writeFile(talkers);
   res.status(201).json(newTalker);
 });
 
 router.put('/:id',
 auth, validateName, async (req, res) => {
   const { id } = req.params;
   const { name, age, talk } = req.body;
   const talkers = await fsFuncs.readFile();
   const index = talkers.findIndex((talker) => talker.id === Number(id));
     if (index === -1) {
       return res.status(404).json({
         message: 'Pessoa palestrante não encontrada',
       });
     }
     talkers[index] = { id: Number(id), name, age, talk };
     fsFuncs.writeFile(talkers);
     return res.status(200).json(talkers[index]);
 });

module.exports = router;