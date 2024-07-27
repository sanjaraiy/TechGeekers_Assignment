const env = require('dotenv');
const axios = require('axios');

env.config();

const url = 'https://pixabay.com/api/';
const API_KEY = process.env.PIXABAY_API_KEY;

/**
 * 
 * @param {string} query 
 * @returns {Promise<Array<Object>>} 
 */

async function searchImages(query) {
    try {
      const response = await axios.get(url, {
        params: {
          key: API_KEY,
          q: query,
          image_type: 'photo'
        }
      });
  
      if (response.data.hits && response.data.hits.length > 0) {
        return response.data.hits.map(hit => ({
          imageUrl: hit.webformatURL,
          alt: hit.tags
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching data from Pixabay:', error.message);
      throw error;
    }
  }
  

  //=============== Here Search query ==========================
  const query = 'cats';

  searchImages(query)
    .then(images => {
       console.log('Search results:', images);
    })
    .catch(error => {
       console.error('Error:', error.message);
    });
  