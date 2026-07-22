const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/o-printing')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const uploadDir = path.join(process.cwd(), 'uploads');
const fs = require('fs');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({
    url: `http://localhost:5000/uploads/${req.file.filename}`,
    key: req.file.filename,
  });
});

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/cart', cartRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
