const db = require("../model/db.js");

const getMaj = (req, res) => {
    const sql = 'SELECT * FROM maj';
    db.query(sql, (error, data) => {
        if (error) return res.status(500).json({ error: error });
        return res.json(data);
    });
};
const getLast5Maj = (req, res) => {
    const sql = 'SELECT * FROM maj ORDER BY maj_id DESC LIMIT 5';
    db.query(sql, (error, data) => {
        if (error) return res.status(500).json({ error: error });
        return res.json(data);
    });
};

const createMaj = (req, res) => {
    const { Env_num, Env_exp, Env_dest, Hist_date, Hist_prev_etat, Hist_current_state } = req.body;

    const sql = "INSERT INTO maj (Env_num, Env_exp, Env_dest, Hist_date, Hist_prev_etat, Hist_current_state) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [Env_num, Env_exp, Env_dest, Hist_date, Hist_prev_etat, Hist_current_state], (err, result) => {
        if (err) {
            console.error("Error putting maj:", err);
            return res.status(500).json({ error: "internal server error" });
        }
        return res.status(201).json({ message: "Maj created successfully", id: result.insertId });
    });
};

module.exports = { getMaj, createMaj ,getLast5Maj};
