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

// Start


app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/api/quiz/", (req, res, next) => {
    let sql = "select nameQuiz from Quizes"
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

app.get("/api/quiz/:id", (req, res, next) => {
    let sql = "select * from Questions where Quizes_idQuizes = ?"
    let params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "questions":rows
        })
    });
});

app.get("/api/quiz/numberofquestions/:id", (req, res, next) => {
    let sql = "select idQuestions from Questions where Quizes_idQuizes = ?"
    let params = [req.params.id]
    let numberOfQuestions = 0
    let questions = []
    db.all(sql, params, (err, rows) => {
        questions = rows
        for(let q in questions){numberOfQuestions += 1}
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "Number of questions":numberOfQuestions
        })
    });
});

app.get("/api/quiz/id_firstquestion/:id", (req, res, next) => {
    let sql = "select idQuestions from Questions where Quizes_idQuizes = ?"
    let params = [req.params.id]
    let idFirstQuestion = 0
    let questions = []
    db.all(sql, params, (err, rows) => {
        questions = rows
        idFirstQuestion = rows[0]
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "Id first question":idFirstQuestion
        })
    });
});

app.get("/api/quiz:quizName/questions", (req, res, next) => {
    let params = [req.params.quizName]
    let sql = "SELECT * from " + params

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

app.get("/api/quiz:quizId/question:questionId/answers", (req, res, next) => {
    let sql = "select a1, a2, a3, correctAnswer from Questions where Quizes_idQuizes = ? and idQuestions = ?"
    let params = [req.params.quizId, req.params.questionId]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "answer":rows
        })
    });
});

app.get("/api/questions", (req, res, next) => {
    let sql = "select * from Questions"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "quiz":rows
        })
    });
});

app.get("/api/quiz/questions/:quiz-id", (req, res, next) => {
    let sql = "select * from Questions where id = ?"
    let param = [req.params.id];
    db.get(sql, param, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "question":row
        })
    });
})

app.get("/api/users/:username", (req, res, next) => { // get password
    let sql = "select * from Users where username = ?"
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

app.post("/api/createname/:newQuizTitle", (req, res, next) => {
    let errors=[]
    let sql ='INSERT INTO Quizes (nameQuiz) VALUES (?)'
    let params = [req.params.newQuizTitle]
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

app.post("/api/createtable/:newQuizTitle", (req, res, next) => {
    let errors=[]
    let params = [req.params.newQuizTitle]
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

app.post("/api/createquestion/:newQuizTitle/:newQuestion/:newCorrectAnswer/:newA1/:newA2/:newA3", (req, res, next) => {
    let errors=[]
    let params = [req.params.newQuizTitle]
    let question = [req.params.newQuestion]
    let correctAnswer = [req.params.newCorrectAnswer]
    let a1 = [req.params.newA1]     
    let a2 = [req.params.newA2]     
    let a3 = [req.params.newA3]     
    let sql =`INSERT INTO ` +params+ ` (question, correctAnswer, a1 , a2 , a3) 
    VALUES ("` +question+ `", "` +correctAnswer+ `", "` +a1+ `", "` +a2+ `", "` +a3+ `" )`

    // let sql =`INSERT INTO  +params+ (question, correctAnswer, a1 , a2 , a3) 
    // VALUES (  ,   ,   ,   ,   )`

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

/*



// -------------------------------------------------------------------------------------------------------------------------------
app.get("/api/bok/:id", (req, res, next) => {
    let sql = "select * from bok where bokId = ?"
    let params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "bok":row
        })
    });
});




app.put("/api/bok/:id", (req, res, next) => {
    let data = {
        bokTitel: req.body.bokTitel,
        bokForfattare: req.body.bokForfattare,
        bokIsbn: req.body.bokIsbn,
        bokPris: req.body.bokPris
    }
    let sql ='UPDATE bok SET bokTitel = ?, bokForfattare = ?, bokIsbn = ?, bokPris = ? WHERE bokId = ?'
    let params =[data.bokTitel, data.bokForfattare, data.bokIsbn, data.bokPris, req.params.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "bok": data,
            "id" : this.lastID
        })
    });
})

app.delete("/api/bok/:id", (req, res, next) => {
    db.run(
        'DELETE FROM bok WHERE bokId = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
        });
})

// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});*/
