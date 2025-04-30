const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser')

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {

    const token = req.headers.cookie?.split('=')[1] || req.header('Authorization')?.split(' ')[1];
    // console.log(token);
    
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;        
        next();
    }); 
}

// Middleware to check admin or not
function checkAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
}

// role ENUM('admin', 'instructor', 'student')
// Register a new user
app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO User (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, role], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error registering user', error: err });
        res.status(201).json({ message: 'User registered', id: result.insertId });
    });
});

// Login a user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM User WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error logging in', error: err });

        const user = results[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.ID, role: user.role }, process.env.JWT_SECRET, { expiresIn: '4d' });
        res.cookie("token", token).json({ token });
    });
});

// Get all users (admin only)
app.get('/users', authenticateToken, checkAdmin, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const query = 'SELECT ID, name, email, role FROM User';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching users', error: err });
        res.json(results);
    });
});

// Delete a user (admin only)
app.delete('/users/:id', authenticateToken, checkAdmin, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const query = 'DELETE FROM User WHERE ID = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error deleting user', error: err });
        res.json({ message: 'User deleted' });
    });
});

// Generic report generator
app.get('/report', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const { table, filters } = req.query;
    const query = `SELECT * FROM ${table}${filters ? ` WHERE ${filters}` : ''}`;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error generating report', error: err });
        res.json(results);
    });
});

// Get user by ID
app.get('/me', authenticateToken, (req, res) => {
    const query = 'SELECT ID, name, email, role FROM User WHERE ID = ?';
    db.query(query, [req.user.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error while finding user', error: err });
        res.json(result);
    });
});


// Parent tables: classroom, course, instructor, student, time_slot
const parentEntities = ['classroom', 'course', 'time_slot'];

parentEntities.forEach(entity => {
    // READ ALL
    app.get(`/${entity}`, (req, res) => {
        let sql = `SELECT * FROM ${entity}`;
        db.query(sql, (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    });

    // CREATE
    app.post(`/${entity}`, (req, res) => {
        let sql = `INSERT INTO ${entity} SET ?`;
        db.query(sql, req.body, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
    });

    // READ BY ID (assuming primary key is 'id' for simplicity)
    app.get(`/${entity}/:id`, (req, res) => {
        let sql = `SELECT * FROM ${entity} WHERE id = ?`;
        db.query(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result);
        });
    });

    // UPDATE
    app.put(`/${entity}/:id`, (req, res) => {
        let sql = `UPDATE ${entity} SET ? WHERE id = ?`;
        db.query(sql, [req.body, req.params.id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result);
        });
    });

    // DELETE
    app.delete(`/${entity}/:id`, (req, res) => {
        let sql = `DELETE FROM ${entity} WHERE id = ?`;
        db.query(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result);
        });
    });
});

// app.post('/test/register', async (req, res) => {
//     const { name, email, password, role, roleData } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // role nusar
//     if(role=='student'){
//         const query = 'INSERT INTO student VALUES (?, ?, ?, ?)';
//         db.query(query, [roleData.ID, roleData.name, roleData.dept_name, roleData.tot_cred], (err, result) => {
//             if (err) return res.status(500).json({ message: 'Error registering user', error: err });
//         });
//     }else{
//         const query = 'INSERT INTO instructor VALUES (?, ?, ?, ?)';
//         db.query(query, [roleData.ID, roleData.name, roleData.dept_name, roleData.tot_cred], (err, result) => {
//             if (err) return res.status(500).json({ message: 'Error registering user', error: err });
//         });
//     }

//     // user 
//     if(role=='student'){
//         const query = 'INSERT INTO User (name, email, password, role, student_id) VALUES (?, ?, ?, ?, ?)';
//         db.query(query, [name, email, hashedPassword, role, roleData.ID], (err, result) => {
//             if (err) return res.status(500).json({ message: 'Error registering user', error: err });
//             res.status(201).json({ message: 'User registered', id: result.insertId });
//         });
//     }
//     else{
//         const query = 'INSERT INTO User (name, email, password, role, instructor_id) VALUES (?, ?, ?, ?, ?)';
//         db.query(query, [name, email, hashedPassword, role, roleData.ID], (err, result) => {
//             if (err) return res.status(500).json({ message: 'Error registering user', error: err });
//             res.status(201).json({ message: 'User registered', id: result.insertId });
//         });
//     }
// });


// Start the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});