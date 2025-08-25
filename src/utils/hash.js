const bcrypt = require('bcrypt');

async function hashPassword(senha) {
    const saltRounds = 10;
    const myPlaintextPassword = senha;

    console.log("Fazendo Criptografia");
    return await bcrypt.hash(myPlaintextPassword, saltRounds)
}

async function comparePassaword (loginSenha, senhaHash) {
    // pega a senha ditada no login e hash da senha no banco
    return await bcrypt.compare(loginSenha, senhaHash);
}

module.exports = {
    hashPassword,
    comparePassaword,
}