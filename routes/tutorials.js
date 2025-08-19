const express = require('express');
const router = express.Router();
const Tutorial = require('../models/Tutorial');

// Get all published tutorials
router.get('/published', async (req, res) => {
  try {
    const tutorials = await Tutorial.find({ published: true });
    if (tutorials.length === 0) return res.status(200).json([]);
    res.status(200).json(tutorials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tutorials or filter by title
router.get('/', async (req, res) => {
  try {
    const title = req.query.title;
    const condition = title
      ? { title: { $regex: new RegExp(title, 'i') } }
      : {};
    const tutorials = await Tutorial.find(condition);
    res.status(200).json(tutorials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tutorial by ID
router.get('/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return res.sendStatus(404);
    res.status(200).json(tutorial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new tutorial
router.post('/', async (req, res) => {
  try {
    const tutorial = new Tutorial({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published || false,
    });
    const savedTutorial = await tutorial.save();
    res.status(201).json(savedTutorial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update tutorial by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTutorial = await Tutorial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTutorial) return res.sendStatus(404);
    res.status(200).json(updatedTutorial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete tutorial by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tutorial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete all tutorials
router.delete('/', async (req, res) => {
  try {
    await Tutorial.deleteMany({});
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;