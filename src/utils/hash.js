const bcrypt = require('bcrypt');

async function hashPassword(senha) {
    const saltRounds = 10;
    const myPlaintextPassword = senha;

    console.log("Fazendo Criptografia");
    const senhaCriptografada = await bcrypt.hash(myPlaintextPassword, saltRounds);
    console.log(senhaCriptografada)
    return senhaCriptografada
}

async function comparePassaword (loginSenha, senhaHash) {
    // pega a senha ditada no login e hash da senha no banco
    return await bcrypt.compare(loginSenha, senhaHash);
}

module.exports = {
    hashPassword,
    comparePassaword,
}