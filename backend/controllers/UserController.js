      const db =  require("../model/db.js");

      const getUsers = (req, res) => {
          const sql = 'SELECT * FROM utilisateur';
          db.query(sql, (error, data) => {
              if (error) return res.status(500).json({ error: error })
              return res.json(data);
          });
      }
      const loginUser = async (req, res) => {
        const { Us_mail, Us_pwd } = req.body;
      
        console.log("User input:", Us_mail, Us_pwd);
      
        if (!Us_mail || !Us_pwd) {
          return res.status(400).json({ error: "Missing email or password" });
        }
      
        try {
          const user = await getUserByEmail(Us_mail);
      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          console.log("User retrieved:", user);
      
          // Compare the plain password with the hashed password from the database
          const match = await bcrypt.compare(Us_pwd.trim(), user.Us_pwd.trim());

      
          console.log("Password match:", match);
      
          if (!match) {
            return res.status(401).json({ error: "Incorrect password" });
          }
      
          if (user.Fo_id !== 1 || user.validate !== 1) {
            return res.status(403).json({ error: "le compte est bloqué" });
          }
      
          // Login successful, generate user token
          const userToken = Math.random().toString(36).substring(2, 17);
      
          // You can store the userToken in the database or use a JWT for authentication
      
          return res.status(200).json({ message: "Login successful", userToken });
        } catch (error) {
          console.error("Error logging in user:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      };
      
      
      

  const getUserByEmail = (Us_mail) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM utilisateur WHERE Us_mail = ?';
      db.query(sql, [Us_mail], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  };
    
      const bcrypt = require('bcrypt');

      const CreateUser = (req, res) => {
        const { Us_nom, Us_matricule, Us_login, Us_mail, Us_pwd, Fo_id, Grp_code, Agence_id } = req.body;
      
        if (!Us_nom || !Us_matricule || !Us_login || !Us_mail || !Us_pwd || !Fo_id || !Grp_code) {
          return res.status(400).json({ error: "Missing required fields" });
        }
      
        console.log("Non-hashed password:", Us_pwd);
      
        // Hash the password
        bcrypt.hash(Us_pwd, 10, (err, hashedPassword) => {
          if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
      
          console.log("Hashed password:", hashedPassword);
      
          const userSql = "INSERT INTO utilisateur (Us_nom, Us_matricule, Us_login, Us_mail, Us_pwd, Fo_id, Grp_code, Agence_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
          db.query(userSql, [Us_nom, Us_matricule, Us_login, Us_mail, hashedPassword, Fo_id, Grp_code, Agence_id], (err, result) => {
            if (err) {
              console.error("Error adding user:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }
      
            const fetchUserSql = "SELECT * FROM utilisateur WHERE Us_id = ?";
            db.query(fetchUserSql, [result.insertId], (fetchErr, userData) => {
              if (fetchErr) {
                console.error("Error fetching added user:", fetchErr);
                return res.status(500).json({ error: "Internal Server Error" });
              }
      
              return res.status(201).json({ message: "User added successfully", user: userData[0] });
            });
          });
        });
      };
      
      
      
      
        const UpdateValidation = (req, res) => {
          const userId = req.params.id;
          const { validate } = req.body;
        
          const sql = "UPDATE utilisateur SET validate = ? WHERE Us_id = ?";
          db.query(sql, [validate, userId], (err, result) => {
            if (err) {
              console.error("Error updating user validation status:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }
        
            if (result.affectedRows === 0) {
              return res.status(404).json({ error: "User not found" });
            }
        
            return res.status(200).json({ message: "User validation status updated successfully" });
          });
        };

      
        const UpdateUser = (req, res) => {
          const userId = req.params.id;
          const { Us_nom, Us_matricule, Us_login, Us_mail, Us_pwd, Fo_id, Grp_code, validate, Agence_id } = req.body;
        
          // Check if Us_pwd is provided
          if (!Us_pwd) {
            return res.status(400).json({ error: "Password is required" });
          }
        
          // Hash the password
          bcrypt.hash(Us_pwd, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
              console.error("Error hashing password:", hashErr);
              return res.status(500).json({ error: "Internal Server Error" });
            }
        
            const sql = "UPDATE utilisateur SET Us_nom = ?, Us_matricule = ?, Us_login = ?, Us_mail = ?, Us_pwd = ?, Fo_id = ?, Grp_code = ?, validate = ?, Agence_id = ? WHERE Us_id = ?";
            db.query(sql, [Us_nom, Us_matricule, Us_login, Us_mail, hashedPassword, Fo_id, Grp_code, validate, Agence_id, userId], (err, result) => {
              if (err) {
                console.error("Error updating user:", err);
                return res.status(500).json({ error: "Internal Server Error" });
              }
        
              if (result.affectedRows === 0) {
                return res.status(404).json({ error: "User not found" });
              }
        
              // Fetch the updated user data
              const fetchUserSql = "SELECT * FROM utilisateur WHERE Us_id = ?";
              db.query(fetchUserSql, [userId], (fetchErr, userData) => {
                if (fetchErr) {
                  console.error("Error fetching updated user data:", fetchErr);
                  return res.status(500).json({ error: "Internal Server Error" });
                }
        
                // Return the updated user data
                return res.status(200).json(userData[0]);
              });
            });
          });
        };        
        
        const DeleteUser = (req, res) => {
          const userId = req.params.id;
        
          const deleteSql = "DELETE FROM utilisateur WHERE Us_id = ?";
          db.query(deleteSql, [userId], (err, result) => {
            if (err) {
              console.error("Error deleting user:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }
        
            if (result.affectedRows === 0) {
              return res.status(404).json({ error: "User not found" });
            }
        
            return res.status(200).json({ message: "User deleted successfully" });
          });
        }
        

      module.exports = { CreateUser, getUsers, UpdateUser, DeleteUser,UpdateValidation,loginUser }  