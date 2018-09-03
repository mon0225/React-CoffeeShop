const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Coffee = require('../models/Coffee')

router.get('/coffees', async (req, res, next) => {
  try{
    const coffees = await Coffee.find()
    // probablemente veas por primera vez este res.status.json({'':''})
    // esta notación permite devolver datos al cliente(React por ejemplo o 
    // postman) 
    res.status(200).json(coffees)
  }catch(err){
    res.status(500)
    next(err)
  }
})

router.post('/coffees', async (req, res, next) => {
  const { brand, name, specs, description, origin } = req.body

  const newCoffee = new Coffee({brand, name, specs, description, origin})

  try{
    const coffee = await newCoffee.save()
    res.status(200).json({ 'message': 'OK', 'id': coffee._id})
  }catch(err){
    res.status(500)
    next(err)
  }
})

router.get('/coffees/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' })
    return
  }

  Coffee.findById(req.params.id)
    .then(coffee => {
      res.status(200).json(coffee)
    })
    .catch(err => next(err))
})

router.put('/coffees/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    description: req.body.description,
    origin: req.body.origin
  };

  Coffee.findByIdAndUpdate(req.params.id, updates, {new: true})
  .then(coffee => {
    res.json({
      message: 'Coffee updated successfully'
    });
  }) 
  .catch(error => next(error))     
})

/* DELETE a Coffee. */
router.delete('/coffees/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Coffee.remove({ _id: req.params.id })
  .then(message => {
    return res.json({
      message: 'Coffe has been removed!'
    });
  })
  .catch(error => next(error))
});


module.exports = router