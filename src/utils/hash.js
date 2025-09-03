const bcrypt = require('bcrypt');

function hashPassword(senha) {
    const saltRounds = 10;
    const myPlaintextPassword = senha;

    console.log("Fazendo Criptografia");
    return bcrypt.hash(myPlaintextPassword, saltRounds)
}

async function comparePassaword (loginSenha, senha) {
    // pega a senha ditada no login e hash da senha no banco
    return await bcrypt.compare(loginSenha, senha);
}

module.exports = {
    hashPassword,
    comparePassaword,
}