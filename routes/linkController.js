const Link = require('../models/Link');
const crypto = require('crypto');

// Função para gerar um ID curto aleatório
function generateShortId(length = 6) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}

// Criação de link curto com expiração
exports.createLink = async (req, res) => {
  const { url, expiresAt } = req.body;

  if (!url || !expiresAt) {
    return res.status(400).json({ error: 'URL e data de expiração são obrigatórias.' });
  }

  try {
    // Gera ID curto único
    let shortId;
    let exists = true;
    while (exists) {
      shortId = generateShortId();
      exists = await Link.findOne({ id: shortId });
    }

    const link = await Link.create({
      id: shortId,
      url,
      expiresAt: new Date(expiresAt),
    });

    const baseUrl = process.env.BASE_URL || `http://localhost:3000`;
    const shortUrl = `${baseUrl}/${shortId}`;

    res.status(201).json({ shortUrl });

  } catch (err) {
    console.error('Erro ao criar link:', err);
    res.status(500).json({ error: 'Erro interno ao criar link.' });
  }
};

// Redirecionamento com verificação de expiração
exports.getLink = async (req, res) => {
  const { id } = req.params;

  try {
    const link = await Link.findOne({ id });

    if (!link) {
      return res.status(404).send('Link não encontrado.');
    }

    if (new Date() > link.expiresAt) {
      return res.status(410).send('Link expirado.');
    }

    res.redirect(link.url);

  } catch (err) {
    console.error('Erro ao redirecionar:', err);
    res.status(500).send('Erro no servidor.');
  }
};
