const Appointment = require('../models/appointment');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }


    const { regno, pname, email, date, time, condition } = req.body;

    const appointment = new Appointment({
        regno,
        pname,
        email,
        date,
        time,
        condition
    });
    //save appointment in the database
    appointment.save()
        .then(() => {
            res.status(201).send({ message: "Appointment Registered successfully" });
        })
        .catch(err => {
            res.status(201).send({ message: err.message || "Error occured while registering the appointment" });
        });
}

exports.findAll = (req,res) => {
    Appointment.find()
    .then(appointment => {
        res.send(appointment)
    })
    .catch(err =>{
        res.status(500).send({message:err.message || "Error occured while retriving appointment information"})
    })
}


//retrieve and return a single appointment
exports.findOne = (req,res) => {
    if(req.params.id){
        const id = req.params.id;

        Appointment.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message:"Appointment not found with id" + id})
            }
            else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(404).send({message:"Error retrieving appointment with id" + id})
        })
    }
}