import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure public/images directory exists
const imagesDir = path.resolve('public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Serve static images directly from public/images folder
app.use('/public/images', express.static(imagesDir));
app.use('/images', express.static(imagesDir));

// JSON Database persistence file
const dbPath = path.resolve('server/data/db.json');
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Read database records
function readDatabase() {
  if (!fs.existsSync(dbPath)) {
    const initialData = [
      {
        id: 'img-cust-1',
        title: 'Enterprise Client Site Installation',
        altText: 'Customer site machinery installation team',
        category: 'Customer',
        description: 'On-site industrial machinery deployment and handover ceremony with key client representatives.',
        tags: ['customer', 'installation', 'enterprise', 'site-visit'],
        status: 'Active',
        uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        fileName: 'customer-site-install.jpg',
        fileSize: 2150000,
        mimeType: 'image/jpeg',
        localPath: 'public/images/customer-site-install.jpg',
        url: `http://localhost:${port}/public/images/customer-site-install.jpg`
      },
      {
        id: 'img-event-1',
        title: 'Annual Industrial Tech Expo 2026',
        altText: 'Exhibition booth displaying automated robotic machinery',
        category: 'Event',
        description: 'High-tech industrial exhibition showcase featuring live robotic demonstrations and customer networking.',
        tags: ['event', 'expo', 'robotics', 'exhibition'],
        status: 'Active',
        uploadedAt: new Date(Date.now() - 86400000).toISOString(),
        fileName: 'industrial-tech-expo.jpg',
        fileSize: 3420000,
        mimeType: 'image/jpeg',
        localPath: 'public/images/industrial-tech-expo.jpg',
        url: `http://localhost:${port}/public/images/industrial-tech-expo.jpg`
      }
    ];
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const content = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading JSON DB:', err.message);
    return [];
  }
}

// Write database records
function writeDatabase(records) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing JSON DB:', err.message);
  }
}

// Multer Storage Configuration targeting public/images directory
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, imagesDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    const nameWithoutExt = path.parse(file.originalname).name.replace(/[^a-zA-Z0-9]/g, '-');
    cb(null, `${nameWithoutExt}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit per file
});

// GET all images with search, category, status filter
app.get('/api/images', (req, res) => {
  const { search, category, status } = req.query;
  let records = readDatabase();

  if (search) {
    const q = search.toLowerCase();
    records = records.filter(
      (img) =>
        (img.title && img.title.toLowerCase().includes(q)) ||
        (img.category && img.category.toLowerCase().includes(q)) ||
        (img.description && img.description.toLowerCase().includes(q)) ||
        (img.tags && img.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  if (category && category !== 'All') {
    records = records.filter((img) => img.category === category);
  }

  if (status && status !== 'All') {
    records = records.filter((img) => img.status === status);
  }

  res.json(records);
});

// GET single image by ID
app.get('/api/images/:id', (req, res) => {
  const records = readDatabase();
  const image = records.find((img) => img.id === req.params.id);
  if (!image) return res.status(404).json({ message: 'Image asset not found.' });
  res.json(image);
});

// POST single image upload (Multer -> public/images/)
app.post('/api/images/upload', upload.single('image'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No image file uploaded.' });
    }

    const reqHost = `${req.protocol}://${req.get('host')}`;
    const relativePath = `public/images/${file.filename}`;
    const publicUrl = `${reqHost}/public/images/${file.filename}`;

    const tagsArray = typeof req.body.tags === 'string'
      ? req.body.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : Array.isArray(req.body.tags) ? req.body.tags : [];

    const newEntry = {
      id: `img-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: req.body.title || path.parse(file.originalname).name,
      altText: req.body.altText || req.body.title || 'Local Image Asset',
      category: req.body.category || 'Customer',
      description: req.body.description || '',
      tags: tagsArray.length > 0 ? tagsArray : [req.body.category?.toLowerCase() || 'image'],
      status: req.body.status || 'Active',
      uploadedAt: new Date().toISOString(),
      fileName: file.filename,
      originalName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      localPath: relativePath,
      url: publicUrl
    };

    const records = readDatabase();
    records.unshift(newEntry);
    writeDatabase(records);

    console.log(`✅ File saved locally to disk: ${relativePath}`);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Upload handler error:', error);
    res.status(500).json({ message: 'Local image upload failed.', error: error.message });
  }
});

// POST multiple image upload (Multer -> public/images/)
app.post('/api/images/upload-multiple', upload.array('images', 15), (req, res) => {
  try {
    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ message: 'No image files uploaded.' });
    }

    const reqHost = `${req.protocol}://${req.get('host')}`;
    const records = readDatabase();
    const uploadedEntries = [];

    for (const file of files) {
      const relativePath = `public/images/${file.filename}`;
      const publicUrl = `${reqHost}/public/images/${file.filename}`;
      const fileNameBase = path.parse(file.originalname).name;

      const tagsArray = typeof req.body.tags === 'string'
        ? req.body.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : Array.isArray(req.body.tags) ? req.body.tags : [];

      const newEntry = {
        id: `img-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: req.body.title ? `${req.body.title} - ${fileNameBase}` : fileNameBase,
        altText: req.body.altText || fileNameBase,
        category: req.body.category || 'Event',
        description: req.body.description || '',
        tags: tagsArray.length > 0 ? tagsArray : ['multi-upload'],
        status: req.body.status || 'Active',
        uploadedAt: new Date().toISOString(),
        fileName: file.filename,
        originalName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        localPath: relativePath,
        url: publicUrl
      };

      records.unshift(newEntry);
      uploadedEntries.push(newEntry);
      console.log(`✅ File saved locally to disk: ${relativePath}`);
    }

    writeDatabase(records);

    res.status(201).json({
      message: `${uploadedEntries.length} images saved locally in public/images/`,
      images: uploadedEntries
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ message: 'Multiple image upload failed.', error: error.message });
  }
});

// POST image via external URL (no file upload needed)
app.post('/api/images/upload-url', (req, res) => {
  try {
    const { url, title, altText, category, description, tags, status } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ message: 'A valid image URL is required.' });
    }

    const tagsArray = typeof tags === 'string'
      ? tags.split(',').map((t) => t.trim()).filter(Boolean)
      : Array.isArray(tags) ? tags : [];

    const newEntry = {
      id: `img-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: title || 'External Image',
      altText: altText || title || 'External Image',
      category: category || 'Customer',
      description: description || '',
      tags: tagsArray.length > 0 ? tagsArray : ['url-import'],
      status: status || 'Active',
      uploadedAt: new Date().toISOString(),
      fileName: '',
      originalName: '',
      fileSize: 0,
      mimeType: 'image/url',
      localPath: '',
      url: url
    };

    const records = readDatabase();
    records.unshift(newEntry);
    writeDatabase(records);

    console.log(`✅ External URL image added: ${url}`);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('URL upload handler error:', error);
    res.status(500).json({ message: 'Failed to save URL image.', error: error.message });
  }
});

// PUT update image details
app.put('/api/images/:id', (req, res) => {
  const records = readDatabase();
  const index = records.findIndex((img) => img.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Image not found.' });

  const current = records[index];
  const tagsArray = typeof req.body.tags === 'string'
    ? req.body.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : Array.isArray(req.body.tags) ? req.body.tags : current.tags;

  const updatedEntry = {
    ...current,
    ...req.body,
    tags: tagsArray,
    id: req.params.id // Protect ID
  };

  records[index] = updatedEntry;
  writeDatabase(records);
  res.json(updatedEntry);
});

// DELETE single image (deletes record & disk file from public/images/)
app.delete('/api/images/:id', (req, res) => {
  const records = readDatabase();
  const index = records.findIndex((img) => img.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Image not found.' });

  const target = records[index];

  // Remove physical file from public/images folder
  if (target.fileName) {
    const fullFilePath = path.resolve('public/images', target.fileName);
    if (fs.existsSync(fullFilePath)) {
      try {
        fs.unlinkSync(fullFilePath);
        console.log(`🗑️ Removed local disk file: ${fullFilePath}`);
      } catch (err) {
        console.warn(`Could not delete local file ${fullFilePath}:`, err.message);
      }
    }
  }

  records.splice(index, 1);
  writeDatabase(records);

  res.json({ success: true, id: req.params.id, message: 'Image asset deleted from local storage.' });
});

// POST bulk delete
app.post('/api/images/delete-bulk', (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'No image IDs provided for deletion.' });
  }

  let records = readDatabase();
  const deletedIds = [];

  ids.forEach((id) => {
    const idx = records.findIndex((img) => img.id === id);
    if (idx !== -1) {
      const target = records[idx];
      if (target.fileName) {
        const fullFilePath = path.resolve('public/images', target.fileName);
        if (fs.existsSync(fullFilePath)) {
          try {
            fs.unlinkSync(fullFilePath);
            console.log(`🗑️ Removed local disk file: ${fullFilePath}`);
          } catch (err) {
            // ignore
          }
        }
      }
      records.splice(idx, 1);
      deletedIds.push(id);
    }
  });

  writeDatabase(records);
  res.json({ success: true, deletedIds, count: deletedIds.length });
});

app.listen(port, () => {
  console.log(`🚀 Customer & Event Image Management Server running on http://localhost:${port}`);
  console.log(`📁 Local Image Storage Directory: ${imagesDir}`);
});
