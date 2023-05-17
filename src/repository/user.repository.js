const pool = require(`../db`)

async function getAllDataDB() {
    const client = await pool.connect();
    const sql = `SELECT * FROM users_info JOIN users ON users.info_id = users_info.id`
    const data = (await client.query(sql)).rows
    return data
}

async function getDataByIdDB(id) {
    const client = await pool.connect();
    const sql = `SELECT * FROM users_info JOIN users ON users.info_id = users_info.id WHERE users_info.id = $1`
    const data = (await client.query(sql, [id])).rows
    return data
}

async function createDataDB(name, surname, birth, city, age) {

    const client = await pool.connect();
    const sql1 = `INSERT INTO users_info(birth,city,age) VALUES($1,$2,$3) RETURNING *`
    const data1 = (await client.query(sql1, [birth, city, age])).rows

    const sql2 = `INSERT INTO users(name,surname, info_id) VALUES($1,$2,$3) RETURNING *`
    const data2 = (await client.query(sql2, [name, surname, data1[0].id])).rows

    return { ...data1[0], ...data2[0] }
}

async function updateDataDB(id, name, surname, birth, city, age) {

    const client = await pool.connect()
    const sql1 = `UPDATE users SET name = $1, surname = $2 WHERE info_id = $3 RETURNING *`
    const data1 = (await client.query(sql1, [name, surname, id])).rows

    const sql2 = `UPDATE users_info SET birth = $1, city = $2, age = $3 WHERE id = $4 RETURNING *`
    const data2 = (await client.query(sql2, [birth, city, age, id])).rows

    return { ...data1[0], ...data2[0] }
}

async function deleteDataDB(id) {
    const client = await pool.connect();
    const sql1 = `DELETE FROM users WHERE info_id = $1 RETURNING *`;
    const data1 = (await client.query(sql1, [id])).rows;

    const sql2 = `DELETE FROM users_info WHERE id = $1 RETURNING *`
    const data2 = (await client.query(sql2, [id])).rows;

    return { ...data1[0], ...data2[0] }
}
module.exports = { getAllDataDB, getDataByIdDB, createDataDB, updateDataDB, deleteDataDB }