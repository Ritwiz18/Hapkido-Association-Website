require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { pool, connectWithRetry } = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'USHA Backend is running' });
});

// ─── Student Registration ─────────────────────
app.post('/api/register/student', async (req, res) => {
  const { full_name, dob, phone, email, belt_level, program, address } = req.body;
  if (!full_name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required.' });
  }
  try {
    const [result] = await pool.execute(
      `INSERT INTO student_registrations
       (full_name, dob, phone, email, belt_level, program, address)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [full_name, dob || null, phone, email || null, belt_level || null, program || null, address || null]
    );
    res.json({ success: true, message: 'Registration submitted!', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ─── Club Affiliation ─────────────────────────
app.post('/api/register/club', async (req, res) => {
  const { club_name, city, contact_person, phone, email, member_count, head_instructor } = req.body;
  if (!club_name || !city || !contact_person || !phone || !email) {
    return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
  }
  try {
    const [result] = await pool.execute(
      `INSERT INTO club_affiliations
       (club_name, city, contact_person, phone, email, member_count, head_instructor)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [club_name, city, contact_person, phone, email, member_count || null, head_instructor || null]
    );
    res.json({ success: true, message: 'Club affiliation submitted!', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ─── Contact Form ─────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }
  try {
    const [result] = await pool.execute(
      `INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)`,
      [name, email, subject || null, message || null]
    );
    res.json({ success: true, message: 'Message sent successfully!', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// ─── View All Registrations (Admin) ──────────
app.get('/api/admin/students', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM student_registrations ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.get('/api/admin/clubs', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM club_affiliations ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.get('/api/admin/contacts', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ─── Start Server ─────────────────────────────
connectWithRetry().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error(err.message);
  process.exit(1);
});
