const multer = require('multer'); 
const path = require('path');

// Diretório onde os arquivos serão salvos
// ATENÇÃO: É necessário manter o diretório 'public' para poder utilizar no front-end
//A LINHA ABAIXO É O CAMINHO DO DIRETÓRIO ONDE SERÃO SALVAS AS IMAGENS, O __DIRNAME É O CAMINHO DO ARQUIVO ATUAL, 
//E O JOIN SERVE PRA JUNTAR O CAMINHO DO ARQUIVO ATUAL COM O CAMINHO DO DIRETÓRIO ONDE AS IMAGENS SERÃO SALVAS
const diretorio = path.join(__dirname, '../../public/imgs/imagens-perfil');

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, diretorio) 
  },
  
  filename: (req, file, cb) => {
    const extensaoArquivo = file.originalname.split('.')[1];

    const novoNomeArquivo = require('crypto')
      .randomBytes(64)
      .toString('hex');

    
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
  }
});

module.exports = multer({ storage });