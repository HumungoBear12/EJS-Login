const errorHandler = (req, res, err, next) => {
    if(err){
        res.status(500).json({msg: err})
    }
    next();
};

module.exports = errorHandler;