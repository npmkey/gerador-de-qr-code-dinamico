const express = require('express');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const { saveLink, getLink } = require('../data/store');

const router = express.Router();

router.post('/create', (req, res) => {
  const { url, expiresAt } = req.body;

  if (!url || !expiresAt) {
    return res.status(400).json({ error: 'URL e data de expiração são obrigatórios.' });
  }

  const id = uuidv4().slice(0, 6);
  const expiration = dayjs(expiresAt);

  if (!expiration.isValid()) {
    return res.status(400).json({ error: 'Data de expiração inválida.' });
  }

  saveLink(id, {
    url,
    expiresAt: expiration.toISOString(),
  });

  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
  const shortUrl = `${BASE_URL}/${id}`;

  return res.status(201).json({
    id,
    shortUrl,
    expiresAt: expiration.toISOString(),
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const record = getLink(id);

  if (!record) {
    return res.status(404).send('❌ Link não encontrado.');
  }

  const now = dayjs();
  const expiresAt = dayjs(record.expiresAt);

  if (now.isAfter(expiresAt)) {
    return res.status(410).send('⏰ Este link expirou.');
  }

  return res.redirect(record.url);
});

module.exports = router;
