exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }
}