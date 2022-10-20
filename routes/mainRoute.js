const router = require('express').Router();
const Main = require('../views/Main');
const { Note } = require('../db/models');
const Card = require('../views/Card');

router
  .route('/')
  .get(async (req, res) => {
    const notes = await Note.findAll();

    res.renderComponent(Main, { notes });
  })
  .post(async (req, res) => {
    const { note } = req.body;

    const { text } = await Note.create({ text: note });

    res.renderComponent(Card, { note: text }, { doctype: false });
  });

module.exports = router;
