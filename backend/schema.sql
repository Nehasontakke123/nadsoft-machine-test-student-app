-- Create students table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL
);

-- Create marks table
CREATE TABLE marks (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE
);

-- -- 🔰 BONUS: Dummy data insert
-- INSERT INTO students (name, age) VALUES 
-- ('Neha', 22),
-- ('Amit', 21),
-- ('Sneha', 23);

-- INSERT INTO marks (subject, score, student_id) VALUES
-- ('Math', 85, 1),
-- ('English', 92, 1),
-- ('Science', 78, 2),
-- ('History', 88, 3);
