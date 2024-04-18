const db = require("../model/db.js");

const getRegistre = (req, res) => {
    const sql = 'SELECT * FROM registre';
    db.query(sql, (error, data) => {
        if (error) return res.status(500).json({ error: error });
        return res.json(data);
    });
};

const createRegistre = (req, res) => {
    const { nom } = req.body;

    const sql = "INSERT INTO registre (date, nom) VALUES (NOW(), ?)";
    db.query(sql, [nom], (err, result) => {
        if (err) {
            console.error("Error creating registre:", err);
            return res.status(500).json({ error: "internal server error" });
        }
        return res.status(201).json({ message: "Registre created successfully", id: result.insertId });
    });
};


const updateRegistre = (req, res) => {
    const { id } = req.params;
    const { date, nom } = req.body;

    const sql = "UPDATE registre SET date = ?, nom = ? WHERE id = ?";
    db.query(sql, [date, nom, id], (err, result) => {
        if (err) {
            console.error("Error updating registre:", err);
            return res.status(500).json({ error: "internal server error" });
        }
        return res.status(200).json({ message: "Registre updated successfully" });
    });
};

const deleteRegistre = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM registre WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting registre:", err);
            return res.status(500).json({ error: "internal server error" });
        }
        return res.status(200).json({ message: "Registre deleted successfully" });
    });
};

module.exports = { getRegistre, createRegistre, updateRegistre, deleteRegistre };
