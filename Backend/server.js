const express = require("express")
const app = express()
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
app.use(cors())
app.use(express.static('public'))
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const HTTP_PORT = 3000

let db = new sqlite3.Database('./quizzing.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the quizzing database.');
});

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/api/quiz/", (req, res) => {
    let sql = "SELECT nameQuiz FROM Quizes"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "quiz":rows
        })
    });
});

app.get("/api/quiz:quizName/questions", (req, res) => {
    let params = [req.params.quizName]
    let sql = "SELECT * FROM " + params

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "question":rows
        })
    });
});

app.get("/api/users/:username", (req, res) => {
    let sql = "SELECT * FROM Users WHERE username = ?"
    let param = [req.params.username];
    db.get(sql, param, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "user":row
        })
    });
});

app.get("/api/quizresults/:userId", (req, res) => {
    let sql = "SELECT * FROM QuizResults WHERE Users_idUsers = ?"
    let param = [req.params.userId]

    db.all(sql, param, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "results":rows
        })
    });
});

app.get("/api/allquizresults/", (req, res) => {
    let sql = "SELECT quiz, correctAnswers, numberOfQuestions FROM QuizResults"

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "results":rows
        })
    });
});

//POSTS

app.post("/api/createuser/:newName/:newUsername/:newPassword/:newRole", (req, res) => {
    let errors=[]
    let newName = [req.params.newName]
    let newUsername = [req.params.newUsername]
    let newPassword = [req.params.newPassword]
    let newRole = [req.params.newRole]
    let sql =`INSERT INTO Users (name, username, password, role) 
    VALUES ("` +newName+ `", "` +newUsername+ `", "` +newPassword+ `", "` +newRole+ `")`

    db.run(sql, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            msg:"success"
        })
    });
});

app.post("/api/createname/:newQuizName", (req, res) => {
    let errors=[]
    let sql ='INSERT INTO Quizes (nameQuiz) VALUES (?)'
    let params = [req.params.newQuizName]

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            msg:"success"
        })
    });
});

app.post("/api/createtable/:newQuizName", (req, res) => {
    let errors=[]
    let params = [req.params.newQuizName]
    let sql =`CREATE TABLE ` +params+ ` (idQuizes INTEGER PRIMARY KEY NOT NULL, question VARCHAR(45), correctAnswer VARCHAR(45), a1 VARCHAR(45), a2 VARCHAR(45), a3 VARCHAR(45))`

    db.run(sql, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            msg:"success"
        })
    });
});

app.post("/api/createquestion/:newQuizName/:newQuestion/:newCorrectAnswer/:newA1/:newA2/:newA3", (req, res) => {
    let errors=[]
    let params = [req.params.newQuizName]
    let question = [req.params.newQuestion]
    let correctAnswer = [req.params.newCorrectAnswer]
    let a1 = [req.params.newA1]
    let a2 = [req.params.newA2]
    let a3 = [req.params.newA3]
    let sql =`INSERT INTO ` +params+ ` (question, correctAnswer, a1 , a2 , a3) 
    VALUES ("` +question+ `", "` +correctAnswer+ `", "` +a1+ `", "` +a2+ `", "` +a3+ `" )`

    db.run(sql, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            msg:"success"
        })
    });
});

app.post("/api/saveresults/:userId/:quizName/:correctAnswers/:numberOfQuestions", (req, res) => {
    let errors=[]
    let userId = [req.params.userId]
    let quizName = [req.params.quizName]
    let correctAnswers = [req.params.correctAnswers]
    let numberOfQuestions = [req.params.numberOfQuestions]
    let sql =`INSERT INTO QuizResults (Users_idUsers, quiz, correctAnswers, numberOfQuestions)
    VALUES (` +userId+ `, "` +quizName+ `", ` +correctAnswers+ `, ` +numberOfQuestions+ `)`

    db.run(sql, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            msg:"success"
        })
    });
});