const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const { verifyApiKey } = require('../middleware/auth');
const router = express.Router();

const cache = new NodeCache({ stdTTL: 3600 });

const filterCountryData = (data) => ({
    name: data.name.common,
    currency: data.currencies,
    capital: data.capital,
    languages: data.languages,
    flag: data.flags.png,
});

router.get('/countries', verifyApiKey, async (req, res) => {
    try {
        let countries = cache.get('allCountries');
        if (!countries) {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            countries = response.data.map(filterCountryData);
            cache.set('allCountries', countries);
        }
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch countries' });
    }
});

router.get('/countries/:name', verifyApiKey, async (req, res) => {
    try {
        const name = req.params.name.toLowerCase();
        const cacheKey = `country_${name}`;
        let country = cache.get(cacheKey);

        if (!country) {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
            if (!response.data.length) return res.status(404).json({ error: 'Country not found' });
            country = filterCountryData(response.data[0]);
            cache.set(cacheKey, country);
        }
        res.json(country);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.response?.data?.message || 'Error fetching country' });
    }
});

module.exports = router;