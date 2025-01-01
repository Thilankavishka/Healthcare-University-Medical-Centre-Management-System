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
