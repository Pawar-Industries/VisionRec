// routes/visionapi.js
const express = require('express');
const router = express.Router();
const visionApiData = require('../data/VisionApi');

// Route to compare receipts
router.post('/', async (req, res) => {
    try {
        // Extract imagePath from the request body
        let { imagePath } = req.body;
        
        // Check if imagePath is provided
        if (!imagePath) {
            return res.status(400).json({ error: 'Image path is required' });
        }

        // Resolve the relative path to absolute path
        imagePath = path.resolve(__dirname, '..', '..', imagePath);

        // Call the analyzeImage function from data/visionapi.js
        const extractedText = await visionApiData.analyzeImage(imagePath);
        
        // Perform receipt comparison logic here
        console.log('Extracted text from image:', extractedText);

        // Respond with the extracted text
        res.status(200).json({ extractedText });
    } catch (error) {
        console.error('Error comparing receipts:', error);
        res.status(500).json({ error: 'Failed to compare receipts' });
    }
});

module.exports = router;
