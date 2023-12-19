console.log("Hello World")
const pg = require('pg')
// console.log(pg)
// client connection to DB
const client = new pg.Client('postgress://localhost/names_db')

//get express
const express = require('express')
const app = express()

//cors 
const cors = require('cors')
app.use(cors())

//configure express 
app.get('/api/pets', async (req, res, next) => {
    try { 
        const SQL = `
            SELECT * FROM pets
        `
        const response = await client.query(SQL)
        console.log(response)
        res.send(response.rows)

    } catch (error){
        next(error)
    }
})

const init = async () => {
    await client.connect()
    console.log("client working")

    // create db table 
    const SQL = `
        DROP TABLE IF EXISTS pets;
        CREATE TABLE pets (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            is_favorite BOOLEAN
        );
        INSERT INTO pets (name, is_favorite) VALUES ('Willow', true);
        INSERT INTO pets (name) VALUES ('Spencer');
        INSERT INTO pets (name) VALUES ('Bosco');
    `

    // ask client to create the table 
    await client.query(SQL)

    //port 
    const port = 300
    //tell the app to listen to the port 
    app.listen(port, () => {
        console.log(`Listening to port: ${port}`)
    })
}
init() 
