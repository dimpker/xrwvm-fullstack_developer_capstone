const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const reviews_data = JSON.parse(fs.readFileSync("data/reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("data/dealerships.json", 'utf8'));

console.log(`Loaded ${dealerships_data.dealerships.length} dealerships from JSON file`);
console.log(`Loaded ${reviews_data.reviews.length} reviews from JSON file`);

// Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the Dealership API - JSON Mode");
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    console.log(`Returning ${reviews_data.reviews.length} reviews`);
    res.json(reviews_data.reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const dealerId = parseInt(req.params.id);
    const dealerReviews = reviews_data.reviews.filter(review => review.dealership === dealerId);
    console.log(`Returning ${dealerReviews.length} reviews for dealer ${dealerId}`);
    res.json(dealerReviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  try {
    console.log(`Returning ${dealerships_data.dealerships.length} dealerships`);
    res.json(dealerships_data.dealerships);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealerships' });
  }
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const state = req.params.state;
    const filtered = dealerships_data.dealerships.filter(dealer => dealer.state === state);
    console.log(`Returning ${filtered.length} dealerships for state: ${state}`);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealerships by state' });
  }
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const dealerId = parseInt(req.params.id);
    const dealer = dealerships_data.dealerships.find(d => d.id === dealerId);
    if (dealer) {
      console.log(`Returning dealer: ${dealer.full_name}`);
      res.json(dealer);
    } else {
      res.status(404).json({ error: 'Dealer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealer by id' });
  }
});

// Express route to insert review
app.post('/insert_review', async (req, res) => {
  try {
    console.log("Raw request body:", req.body);
    const data = req.body;
    const lastReview = reviews_data.reviews[reviews_data.reviews.length - 1];
    const newId = lastReview ? lastReview.id + 1 : 1;
    
    const newReview = {
      id: newId,
      name: data.name,
      dealership: parseInt(data.dealership),
      review: data.review,
      purchase: data.purchase === 'true' || data.purchase === true,
      purchase_date: data.purchase_date || null,
      car_make: data.car_make || null,
      car_model: data.car_model || null,
      car_year: data.car_year ? parseInt(data.car_year) : null
    };
    
    reviews_data.reviews.push(newReview);
    
    // Write back to file (in a real app, you'd use a proper database)
    fs.writeFileSync("data/reviews.json", JSON.stringify(reviews_data, null, 2));
    
    console.log(`Added new review with ID: ${newId} for dealer: ${data.dealership}`);
    console.log(`Review: "${data.review}"`);
    res.json({ message: "Review added successfully", id: newId });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Error adding review' });
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});