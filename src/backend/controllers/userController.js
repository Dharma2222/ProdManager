import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body;
    // Basic checks
    if (![fullName, email, phone, password, confirmPassword].every(Boolean))
      return res.status(400).json({ error: 'All fields are required.' });
    if (password !== confirmPassword)
      return res.status(400).json({ error: 'Passwords must match.' });

    if (await User.findOne({ email }))
      return res.status(409).json({ error: 'Email in use.' });

    const hash = await bcrypt.hash(password, 10);
    const u = new User({ fullName, email, phone, password: hash });
    await u.save();
    res.status(201).json({ message: 'User registered.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
};
