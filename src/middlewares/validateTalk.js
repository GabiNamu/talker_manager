const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório',
      });
    }
    if (!talk.watchedAt) {
      return res.status(400).json({
        message: 'O campo "watchedAt" é obrigatório',
    });
    } 
    if (talk.rate === undefined) {
      return res.status(400).json({
        message: 'O campo "rate" é obrigatório',
    });
    } 
      
    next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const isFormatDate = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!isFormatDate.test(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  });
  } 
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  } 
  next();
};

module.exports = {
  validateTalk,
  validateWatchedAt,
  validateRate,
};