// backend/src/routes/auth.js (gekürzt)
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req,res)=>{
  const {username, password} = req.body;
  const u = await User.findOne({username});
  if(!u) return res.status(401).send('invalid');
  const ok = await bcrypt.compare(password, u.passwordHash);
  if(!ok) return res.status(401).send('invalid');
  if(!u.approved) return res.status(403).send('account not approved');
  const token = jwt.sign({id:u._id, role:u.role}, process.env.JWT_SECRET, {expiresIn:'12h'});
  res.json({token});
});
module.exports = router;
