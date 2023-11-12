const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    // Fetch Quranic data from the API
    const response = await axios.get('https://api.alquran.cloud/v1/quran/en.sahih');
    const surahs = response.data.data.surahs;

    // Render the main page with the list of surahs
    res.render('index', { surahs });
  } catch (error) {
    console.error('Error fetching Quranic data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/surah/:number', async (req, res) => {
    const surahNumber = req.params.number;
    try {
      // Fetch specific surah data from the API
      const response = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
      const surah = response.data.data;
  
      console.log(surah);
      
      // Render the surah page
      res.render('surah', { surah });
    } catch (error) {
      console.error(`Error fetching Surah ${surahNumber} data:`, error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
