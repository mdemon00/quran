const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    // Fetch surahs from the Quran API
    const response = await axios.get('https://api.quran.com/api/v4/chapters');
    const surahs = response.data.chapters || []; // Use an empty array if chapters is not defined

    // Render the main page with the list of surahs
    res.render('index', { surahs });
  } catch (error) {
    console.error('Error fetching surahs:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
