export function getStudent(req, res) {
    // Read and get all information from the DB.

    Student.find()
        .then((students) => {
            res.status(200).json({
                students
            });
        })
        .catch(() => {
            res.status(500).json({
                message: "failed to fetch students."
            });
        });
}



export function createStudent(req, res) {

    if (req.user == null) {
        res.status(401).json({
            message: "please login and try again later."
        });
        return;
    }

    if (req.user.role != "admin") {
        res.status(403).json({
            message: "you must be an admin to create student."
        });
        return;
    }

    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        city: req.body.city
    });

    student.save()
        .then(() => {
            res.status(201).json({
                message: "student created successfully."
            });
        })
        .catch(() => {
            res.status(500).json({
                message: "failed to create student."
            });
        });
}
