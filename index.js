const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
