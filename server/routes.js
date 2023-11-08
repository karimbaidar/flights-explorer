// const express = require('express');
// const router = express.Router();
// const priceOffers = require('./price-offers.json');

// router.get('/promotions/priceoffers/ond/:origin/:destination', (req, res) => {
//   // Extract parameters from request
//   const { origin, destination } = req.params;

//   // Filter offers based on origin and destination
//   const filteredOffers = priceOffers.filter(offer => offer.origin === origin && offer.destination === destination);

//   // Send response
//   res.json(filteredOffers);
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const priceOffers = require('./price-offers.json');

router.get('/promotions/priceoffers/ond/:origin/:destination', (req, res) => {
  // Extract parameters from request
  const { origin, destination } = req.params;
  const queryParams = req.query;

  // Filter offers based on origin, destination and other parameters
  const filteredOffers = priceOffers.filter(offer => {
    // Check if offer matches origin and destination
    if (offer.origin !== origin || offer.destination !== destination) {
      return false;
    }

    // Check if offer matches all query parameters
    for (let param in queryParams) {
      if (offer[param] !== queryParams[param]) {
        return false;
      }
    }

    return true;
  });

  // Send response
  res.json(filteredOffers);
});

module.exports = router;
