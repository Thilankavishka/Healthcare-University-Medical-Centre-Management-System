exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }
}

const {regno, pname, email, date, time, condition } = req.body;

const appointment = new Appointment({
    regno,
    pname,
    email,
    date,
    time,
    condition
});