let router = require('express').Router();
const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const user = await Subscriber.find();
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

router.post('/', async (req, res) => {
  const user = new Subscriber({
    email: req.body.email,
  })

  try {
    const newUser = await subscriber.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router;