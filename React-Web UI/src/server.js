let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3000;

let pool = new pg.Pool({
    port: 5432,
    password: 'database',
    database: 'SoftCon',
    host: 'localhost',
    user: 'postgres'
}); 

pool.connect((err, db, done) => {
    if (err){
        return console.log(err);
    }
    else{
        db.query('SELECT * from "ProjectInfo"', (err, table) =>{
            done();
            if (err){
                return console.log(err)
            }
            else{
                console.log(table.rows)
            }
        })
    }
})

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(function(request,response,next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/project-data', function(request,response) {
    pool.connect(function(err, db, done) {
        if (err){
            return response.status(400).send(err)
        }
        else{
            db.query('SELECT * from "ProjectInfo"', function(err, table) {
                done();
                if (err){
                    return response.status(400).send(err)
                }
                else{
                    return response.status(200).send(table.rows)
                }
            })
        }
    })
})

app.listen(PORT, () => console.log('Listening on port ' + PORT));