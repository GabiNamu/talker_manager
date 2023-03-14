module.exports = (req, res, next) => {
    const { talk } = req.body;
    const isFormatDate = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    if(!talk) return res.status(400).json({
        message: "O campo \"talk\" é obrigatório"
      })
    if(!talk.watchedAt) return res.status(400).json({
        message: "O campo \"watchedAt\" é obrigatório"
    })
    if(talk.rate === undefined) return res.status(400).json({
        message: "O campo \"rate\" é obrigatório"
    })
  
      if(!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) return res.status(400).json({
          message: "O campo \"rate\" deve ser um número inteiro entre 1 e 5"
        })
    
      if(!isFormatDate.test(talk.watchedAt)) return res.status(400).json({
            message: "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
        })
    next();
}