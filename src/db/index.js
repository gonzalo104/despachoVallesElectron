const sql = require('mssql')
 
const queries = async () => {
    try {
        const pool   = await sql.connect('mssql://sa:gonzalozame04@localhost/despachovalles')
        const result = await sql.query`select * from appointment`
        console.dir(result)
    } catch (err) {
       console.log(err)
    }
}


module.exports = queries();