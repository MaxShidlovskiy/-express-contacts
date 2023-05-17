const { getAllDataDB, getDataByIdDB, createDataDB, updateDataDB, deleteDataDB } = require(`../repository/user.repository`)

async function getAllData() {
    const data = await getAllDataDB();
    return data;
}

async function getDataById(id) {
    const data = await getDataByIdDB(id);
    return data;
}

async function createData(name, surname, birth, city, age) {
    const data = await createDataDB(name, surname, birth, city, age);
    return data;
}


async function updateData(id, name, surname, birth, city, age) {
    const data = await updateDataDB(id, name, surname, birth, city, age);
    return data;
}

async function deleteData(id) {
    const data = await deleteDataDB(id);
    return data;
}
module.exports = { getAllData, getDataById, createData, updateData, deleteData }