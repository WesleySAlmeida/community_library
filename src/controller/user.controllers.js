import createUserService from "../service/user.services.js";

export function createUserController(req, res) {
  const newUser = req.body;

  try {
    const user = createUserService(newUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
