const service = require("./theaters.service");

async function list(req,res) {
    const data = await service.list();
    
    res.json({data: await service.list()})
}

async function readTheater(req,res,next) {
    const { theaterId } = req.params;
    const data = await service.readTheater(theaterId);
    res.json({data});
}

module.exports = {
    list,
    readTheater,
}