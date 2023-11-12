const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Function to fetch ayahs based on surah number
async function fetchAyahs(chapterNumber) {
  try {
    const response = await axios.get(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${chapterNumber}`);
    return response.data.verses || [];
  } catch (error) {
    console.error('Error fetching ayahs:', error.message);
    throw error;
  }
}

app.get('/', async (req, res) => {
  try {
    // Fetch surahs from the Quran API
    const surahResponse = await axios.get('https://api.quran.com/api/v4/chapters');
    const surahs = surahResponse.data.chapters || [];

    // Render the main page with the list of surahs
    res.render('index', { surahs });
  } catch (error) {
    console.error('Error fetching surahs:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/surah/:number', async (req, res) => {
    const surahNumber = req.params.number;
    try {
      // Fetch specific surah data from the API
      const surahResponse = await axios.get(`https://api.quran.com/api/v4/chapters/${surahNumber}`);
      const surah = surahResponse.data || {}; // Access the data directly
  
      // Fetch ayahs for the selected surah
      const ayahs = await fetchAyahs(surahNumber);
  
      // Render the surah page with verses
      res.render('surah', { surah, ayahs });
    } catch (error) {
      console.error(`Error fetching Surah ${surahNumber} data:`, error.message);
      res.status(500).send('Internal Server Error');
    }
  });  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
