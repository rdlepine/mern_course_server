const validate = (req, res) => {
    if(!req.body.lesson || 
        req.body.lesson.length < 3) {
        res.status(400).send("Lesson Required and should be at least three characters long")
        return 1
    } else {
        return 0
    }
}

module.exports = validate