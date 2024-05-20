const { ImageAnnotatorClient } = require('@google-cloud/vision');

const client = new ImageAnnotatorClient();

async function analyzeImage(fileBuffer) {
    const [result] = await client.textDetection({
        content: fileBuffer
    });
    return result.textAnnotations.map(annotation => annotation.description).join('\n');
}

module.exports = {
    analyzeImage
};