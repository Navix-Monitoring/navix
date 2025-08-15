const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10;
    const myPlaintextPassword = password;

    console.log("Fazendo Criptografia");
    return await bcrypt.hash(myPlaintextPassword, saltRounds)
}

async function comparePassaword (password, hashedPassword) {
    // pega a senha ditada no login e hash que foi armazenado no banco de dados
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassaword,
}