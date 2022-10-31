const {getAllPlanets,planets}=require('../../models/planets.model.js')
function httpGetAllPlanets(req,res){
    res.status(200).json(getAllPlanets())
}

module.exports={
    httpGetAllPlanets
}