const fsFuncs = require('../utils/funcsFs');

const validateParamsRate = async (req, res, next) => {
    const { q, rate, date } = req.query;
      const talkers = await fsFuncs.readFile();
        if (rate && !q && !date) {
          const filteredTalkers = talkers
          .filter((talker) => talker.talk.rate === Number(rate));
         return res.status(200).json(filteredTalkers);
        }     
      next();
  };
  
  const validateParamsRateQ = async (req, res, next) => {
    const { q, rate, date } = req.query;
    const talkers = await fsFuncs.readFile();
    if (rate && q && !date) {
      const filteredTalkers = talkers
      .filter((t) => t.name.toLowerCase()
      .includes(q.toLowerCase()) && t.talk.rate === Number(rate));
      return res.status(200).json(filteredTalkers);
    }
    next();
  };
  
  const validateParamsQDate = async (req, res, next) => {
    const { q, rate, date } = req.query;
    const talkers = await fsFuncs.readFile();
    if (!rate && q && date) {
      const filteredTalkers = talkers
      .filter((t) => t.name.toLowerCase().includes(q.toLowerCase()) && t.talk.watchedAt === date);
      return res.status(200).json(filteredTalkers);
    }
    next();
  };
  
  const validateParamsRateDate = async (req, res, next) => {
    const { q, rate, date } = req.query;
    const talkers = await fsFuncs.readFile();
    if (rate && !q && date) {
      const filteredTalkers = talkers
      .filter((t) => t.talk.rate === Number(rate) && t.talk.watchedAt === date);
      return res.status(200).json(filteredTalkers);
    }
    next();
  };
  
  const validateParamnsQ = async (req, res, next) => {
    const { q, rate, date } = req.query;
      const talkers = await fsFuncs.readFile();
    if (!rate && !date && q) {
      const filteredTalkers = talkers
    .filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()));
    return res.status(200).json(filteredTalkers);
    }
    next();
  };
  
  const validateParsmsDate = async (req, res, next) => {
    const { q, rate, date } = req.query;
    const talkers = await fsFuncs.readFile();
        if (date && !rate && !q) {
          const filteredTalkers = talkers
          .filter((talker) => talker.talk.watchedAt === date);
         return res.status(200).json(filteredTalkers);
        }
      next();
  };

module.exports = {
  validateParamnsQ,
  validateParamsRate,
  validateParsmsDate,
  validateParamsRateQ,
  validateParamsQDate,
  validateParamsRateDate,
};