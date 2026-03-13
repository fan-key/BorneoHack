const express = require('express');
const router = express.Router();
const { analyzeAndAdvise } = require('../services/gemini');
const { optimizeImage } = require('../services/imageOptimizer');
const { geminiQueue } = require('../services/requestQueue');

router.post('/', async (req, res, next) => {
  console.log("Diagnose endpoint hit");
  try {
    const { base64Image } = req.body;

    // Validate
    if (!base64Image) {
      return res.status(400).json({
        success: false,
        code: 'NO_IMAGE',
        message: 'Tiada gambar dihantar. Sila ambil gambar tanaman anda.',
      });
    }

    // Reject if queue is too long
    if (geminiQueue.size > 10) {
      return res.status(503).json({
        success: false,
        code: 'SERVER_BUSY',
        message: 'Sistem sedang sangat sibuk. Sila cuba lagi dalam beberapa minit.',
      });
    }

    // Step 1: Optimize image
    console.log('Optimizing image...');
    let optimizedImage;
    try {
      optimizedImage = await optimizeImage(base64Image);
    } catch (imgError) {
      return res.status(400).json({
        success: false,
        code: 'INVALID_IMAGE',
        message: 'Gambar tidak sah. Sila ambil gambar semula.',
      });
    }

    // Step 2: Queue the Gemini request
    console.log(`Adding to queue. Position: ${geminiQueue.size + 1}`);
    const advice = await geminiQueue.add(() => analyzeAndAdvise(optimizedImage));

    // Step 3: Return response
    res.json({
      success: true,
      data: {
        advice: advice,
      },
    });

  } catch (error) {
    if (error.code === 'RATE_LIMITED') {
      return res.status(429).json({
        success: false,
        code: 'RATE_LIMITED',
        message: 'Sistem sedang sibuk. Sila cuba lagi dalam 1-2 minit.',
      });
    }

    if (error.code === 'GEMINI_ERROR') {
      return res.status(502).json({
        success: false,
        code: 'AI_ERROR',
        message: 'Gagal mendapat nasihat. Sila cuba lagi.',
      });
    }

    next(error);
  }
});

module.exports = router;