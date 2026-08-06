import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://ameybahugune_db_user:tgdJLg0wFRJKN7H3@ac-1dba0lz-shard-00-00.4cro3hw.mongodb.net:27017,ac-1dba0lz-shard-00-01.4cro3hw.mongodb.net:27017,ac-1dba0lz-shard-00-02.4cro3hw.mongodb.net:27017/?ssl=true&replicaSet=atlas-l0p3ru-shard-0&authSource=admin&appName=Cluster0' ;
const mongoDbName = process.env.MONGODB_DB_NAME || 'project_adi';

let mongoClient;
let imageCollection;
let mongoReady = false;

async function connectMongo() {
  if (mongoClient && mongoClient.topology?.isConnected?.()) {
    return mongoClient;
  }

  try {
    mongoClient = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000
    });

    await mongoClient.connect();
    const db = mongoClient.db(mongoDbName);
    imageCollection = db.collection('images');
    await imageCollection.createIndex({ id: 1 }, { unique: true, sparse: true });
    await imageCollection.createIndex({ uploadedAt: -1 });
    mongoReady = true;
    return mongoClient;
  } catch (error) {
    mongoReady = false;
    imageCollection = null;
    console.warn('MongoDB connection failed:', error.message , error);
    throw error;
  }
}

connectMongo().then(() => {
  console.log(`✅ MongoDB connected to database: ${mongoDbName}`);
}).catch((err) => {
  mongoReady = false;
  console.error('MongoDB connection failed:', err.message);
});

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

async function readDatabase() {
  try {
    await connectMongo();
    if (!imageCollection) return [];

    const docs = await imageCollection.find({}).sort({ uploadedAt: -1 }).toArray();
    return docs.map((doc) => {
      const { _id, ...rest } = doc;
      return rest;
    });
  } catch (error) {
    console.warn('MongoDB read failed:', error.message);
    return [];
  }
}

async function writeDatabase(records) {
  try {
    await connectMongo();
    if (!imageCollection) return [];

    const docs = records.map((record) => {
      const normalized = { ...record };
      delete normalized._id;
      return normalized;
    });

    await imageCollection.deleteMany({});
    if (docs.length) {
      await imageCollection.insertMany(docs);
    }

    return docs;
  } catch (error) {
    console.warn('MongoDB write failed:', error.message);
    throw error;
  }
}

async function getImageById(id) {
  try {
    await connectMongo();
    if (!imageCollection) return null;

    const doc = await imageCollection.findOne({ id });
    if (!doc) return null;

    const { _id, ...rest } = doc;
    return rest;
  } catch (error) {
    console.warn('MongoDB read failed:', error.message);
    return null;
  }
}

async function upsertImage(entry) {
  try {
    const normalized = { ...entry };
    delete normalized._id;

    await connectMongo();
    if (!imageCollection) {
      throw new Error('MongoDB collection is not available.');
    }

    await imageCollection.updateOne({ id: normalized.id }, { $set: normalized }, { upsert: true });
    return { ...normalized, databaseStatus: 'mongodb' };
  } catch (error) {
    console.warn('MongoDB write failed:', error.message);
    throw error;
  }
}

async function deleteImageById(id) {
  try {
    await connectMongo();
    if (!imageCollection) {
      throw new Error('MongoDB collection is not available.');
    }

    const result = await imageCollection.deleteOne({ id });
    return result.deletedCount > 0;
  } catch (error) {
    console.warn('MongoDB delete failed:', error.message);
    throw error;
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
app.get('/api/images', async (req, res) => {
  try {
    const { search, category, status } = req.query;
    let records = await readDatabase();

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
  } catch (error) {
    console.error('GET /api/images error:', error);
    res.status(500).json({ message: 'Failed to fetch images from MongoDB.', error: error.message });
  }
});

// GET single image by ID
app.get('/api/images/:id', async (req, res) => {
  try {
    const image = await getImageById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image asset not found.' });
    res.json(image);
  } catch (error) {
    console.error('GET /api/images/:id error:', error);
    res.status(500).json({ message: 'Failed to fetch image from MongoDB.', error: error.message });
  }
});

// POST single image upload (Multer -> public/images/)
app.post('/api/images/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No image file uploaded.' });
    }

    const reqHost = `${req.protocol}://${req.get('host')}`;
    const relativePath = `public/images/${file.filename}`;
    
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'project_adi_images',
    });
    const publicUrl = uploadResult.secure_url;

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
      cloudinaryId: uploadResult.public_id,
      url: publicUrl
    };

    const savedEntry = await upsertImage(newEntry);

    console.log(`✅ File saved locally to disk: ${relativePath}`);
    console.log(`🗄️ Upload completed. Database status: ${savedEntry.databaseStatus || 'mongodb'}`);
    res.status(201).json({ ...savedEntry, databaseStatus: savedEntry.databaseStatus || 'mongodb' });
  } catch (error) {
    console.error('Upload handler error:', error);
    res.status(500).json({ message: 'Image upload failed while saving to MongoDB Atlas.', error: error.message });
  }
});

// POST multiple image upload (Multer -> public/images/)
app.post('/api/images/upload-multiple', upload.array('images', 15), async (req, res) => {
  try {
    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ message: 'No image files uploaded.' });
    }

    const reqHost = `${req.protocol}://${req.get('host')}`;
    const uploadedEntries = [];

    for (const file of files) {
      const relativePath = `public/images/${file.filename}`;
      
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: 'project_adi_images',
      });
      const publicUrl = uploadResult.secure_url;
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
        cloudinaryId: uploadResult.public_id,
        url: publicUrl
      };

      const savedEntry = await upsertImage(newEntry);
      uploadedEntries.push({ ...savedEntry, databaseStatus: savedEntry.databaseStatus || 'mongodb' });
      console.log(`✅ File saved locally to disk: ${relativePath}`);
      console.log(`🗄️ Upload completed. Database status: ${savedEntry.databaseStatus || 'local-only'}`);
    }

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
app.post('/api/images/upload-url', async (req, res) => {
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

    const savedEntry = await upsertImage(newEntry);

    console.log(`✅ External URL image added: ${url}`);
    console.log(`🗄️ Upload completed. Database status: ${savedEntry.databaseStatus || 'mongodb'}`);
    res.status(201).json({ ...savedEntry, databaseStatus: savedEntry.databaseStatus || 'mongodb' });
  } catch (error) {
    console.error('URL upload handler error:', error);
    res.status(500).json({ message: 'Failed to save URL image to MongoDB Atlas.', error: error.message });
  }
});

app.get('/api/health', async (_req, res) => {
  try {
    await connectMongo();
    if (!imageCollection) {
      return res.status(503).json({ status: 'unavailable', message: 'MongoDB collection is not ready.' });
    }

    const ping = await imageCollection.db.command({ ping: 1 });
    res.json({ status: 'ok', database: mongoDbName, ping });
  } catch (error) {
    res.status(503).json({ status: 'unavailable', message: error.message });
  }
});

// PUT update image details
app.put('/api/images/:id', async (req, res) => {
  try {
    const existing = await getImageById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Image not found.' });

    const tagsArray = typeof req.body.tags === 'string'
      ? req.body.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : Array.isArray(req.body.tags) ? req.body.tags : existing.tags;

    const updatedEntry = {
      ...existing,
      ...req.body,
      tags: tagsArray,
      id: req.params.id
    };

    await upsertImage(updatedEntry);
    res.json(updatedEntry);
  } catch (error) {
    console.error('PUT /api/images/:id error:', error);
    res.status(500).json({ message: 'Failed to update image in MongoDB.', error: error.message });
  }
});

// DELETE single image (deletes record & disk file from public/images/)
app.delete('/api/images/:id', async (req, res) => {
  try {
    const existing = await getImageById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Image not found.' });

    if (existing.fileName) {
      const fullFilePath = path.resolve('public/images', existing.fileName);
      if (fs.existsSync(fullFilePath)) {
        try {
          fs.unlinkSync(fullFilePath);
          console.log(`🗑️ Removed local disk file: ${fullFilePath}`);
        } catch (err) {
          console.warn(`Could not delete local file ${fullFilePath}:`, err.message);
        }
      }
    }

    if (existing.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(existing.cloudinaryId);
        console.log(`🗑️ Removed Cloudinary asset: ${existing.cloudinaryId}`);
      } catch (err) {
        console.warn(`Could not delete Cloudinary asset ${existing.cloudinaryId}:`, err.message);
      }
    }

    const deleted = await deleteImageById(req.params.id);
    res.json({ success: deleted, id: req.params.id, message: deleted ? 'Image asset deleted from MongoDB.' : 'Image asset not found.' });
  } catch (error) {
    console.error('DELETE /api/images/:id error:', error);
    res.status(500).json({ message: 'Failed to delete image from MongoDB.', error: error.message });
  }
});

// POST bulk delete
app.post('/api/images/delete-bulk', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No image IDs provided for deletion.' });
    }

    const deletedIds = [];
    for (const id of ids) {
      const existing = await getImageById(id);
      if (!existing) continue;

      if (existing.fileName) {
        const fullFilePath = path.resolve('public/images', existing.fileName);
        if (fs.existsSync(fullFilePath)) {
          try {
            fs.unlinkSync(fullFilePath);
            console.log(`🗑️ Removed local disk file: ${fullFilePath}`);
          } catch (err) {
            // ignore
          }
        }
      }

      if (existing.cloudinaryId) {
        try {
          await cloudinary.uploader.destroy(existing.cloudinaryId);
        } catch (err) {
          // ignore
        }
      }

      const deleted = await deleteImageById(id);
      if (deleted) deletedIds.push(id);
    }

    res.json({ success: true, deletedIds, count: deletedIds.length });
  } catch (error) {
    console.error('POST /api/images/delete-bulk error:', error);
    res.status(500).json({ message: 'Failed to delete images from MongoDB.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Customer & Event Image Management Server running on http://localhost:${port}`);
  console.log(`📁 Local Image Storage Directory: ${imagesDir}`);
});
