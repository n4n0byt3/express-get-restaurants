const express = require ("express")
const router = express.Router()
const Restaurant = require("../models/Restaurant")

router.get('/restaurants' , async (req, res) => {
    const fetchedRestaurants = await Restaurant.findAll(); 
        res.send(fetchedRestaurants);
    })
// GET request route to fetch a specific restaurant by its ID
router.get('/restaurants/:id', async (req, res) => {
console.log('Fetching restaurant with the id of: ', req.params.id); 
const fetchedrest = await Restaurant.findByPk(req.params.id);
console.log('Response from db: ', fetchedrest);
res.json(fetchedrest)
});

// POST request route to create a new restaurant resource
router.post('/restaurants/:id', async (req, res) => {
try {
const { name, address, rating } = req.body;
console.log('Creating restaurant with data: ', req.body);
const newRest = await Restaurant.create({
name,
address,
rating
});
console.log('Successfully created restaurant: ', newRest);
res.json(newRest);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Unable to create restaurant' });
}
});

// PUT request route to update an existing restaurant resource
router.put('/restaurants/:id', async (req, res) => {
try {
const { name, address, cuisine } = req.body;
console.log('Updating restaurant with data: ', req.body);
const updatedRest = await Restaurant.update({
name,
address,
cuisine
}, {
where: {
id: req.params.id
}
});
if (updatedRest[0] === 1) {
const updatedRest = await Restaurant.findByPk(req.params.id);
console.log('Successfully updated restaurant: ', updatedRest);
res.json(updatedRest);
} else {
res.status(404).json({ error: 'Restaurant not found' });
}
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Unable to update restaurant' });
}
});

// DELETE request route to delete an existing restaurant resource
router.delete('/restaurants/:id', async (req, res) => {
const restaurantId = req.params.id;
try {
console.log('Deleting restaurant with id: ', restaurantId);
const restaurant = await Restaurant.findByPk(restaurantId);
if (!restaurant) {
return res.status(404).json({ error: 'Restaurant not found' });
}
await restaurant.destroy();
console.log('Successfully deleted restaurant with id: ', restaurantId);
res.json({ message: 'Restaurant deleted successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
});

module.exports = router;