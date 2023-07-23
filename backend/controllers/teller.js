import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Teller from "../models/Teller.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundTeller = await Teller.findOne({ email: email }).exec();
    if (!foundTeller)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundTeller.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { email: foundTeller.email, id: foundTeller.id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: foundTeller, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const foundTeller = await Teller.findOne({ email: email }).exec();
    if (foundTeller)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassowrd = await bcrypt.hash(password, 12);
    const newTeller = await new Teller({
      email,
      password: hashedPassowrd,
      name: `${firstName} ${lastName}`,
    });

    await newTeller.save();

    const token = jwt.sign(
      { email: newTeller.email, id: newTeller.id },
      "test",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: newTeller, token });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
