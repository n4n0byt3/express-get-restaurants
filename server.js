const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");

const port = 3000;

app.use(express.json());

// GET request route to fetch a specific restaurant by its ID
app.get('/restaurants/:id', async (req, res) => {
    const fetchedrest = await Restaurant.findByPk(req.params.id);
    res.json(fetchedrest)
 });

// POST request route to create a new restaurant resource
app.post('/restaurants/:id', async (req, res) => {
   try {
      const { name, address, rating } = req.body;
      const newRest = await Restaurant.create({
         name,
         address,
         rating
      });
      res.json(newRest);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to create restaurant' });
   }
});

// PUT request route to update an existing restaurant resource
app.put('/restaurants/:id', async (req, res) => {
   try {
      const { name, address, rating } = req.body;
      const updatedRest = await Restaurant.update({
         name,
         address,
         rating
      }, {
         where: {
            id: req.params.id
         }
      });
      if (updatedRest[0] === 1) {
         const updatedRest = await Restaurant.findByPk(req.params.id);
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
app.delete('/restaurants/:id', async (req, res) => {
    const restaurantId = req.params.id;
    try {
      const restaurant = await Restaurant.findByPk(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      await restaurant.destroy();
      res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
});