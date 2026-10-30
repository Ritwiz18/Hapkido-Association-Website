-- ============================================
-- USHA Hapkido Association - MySQL Database
-- ============================================

CREATE DATABASE IF NOT EXISTS hapkido_db;
USE hapkido_db;

-- Student Registrations
CREATE TABLE IF NOT EXISTS student_registrations (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  full_name    VARCHAR(150) NOT NULL,
  dob          DATE,
  phone        VARCHAR(20) NOT NULL,
  email        VARCHAR(150),
  belt_level   VARCHAR(50),
  program      VARCHAR(100),
  address      TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Club Affiliations
CREATE TABLE IF NOT EXISTS club_affiliations (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  club_name       VARCHAR(150) NOT NULL,
  city            VARCHAR(100) NOT NULL,
  contact_person  VARCHAR(150) NOT NULL,
  phone           VARCHAR(20) NOT NULL,
  email           VARCHAR(150) NOT NULL,
  member_count    INT,
  head_instructor VARCHAR(200),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  subject    VARCHAR(200),
  message    TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
