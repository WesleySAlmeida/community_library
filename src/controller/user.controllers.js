import userService from "../service/user.services.js";

async function createUserController(req, res) {
  const newUser = req.body;

  try {
    const user = await userService.createUserService(newUser);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function findAllUserController(req, res) {
  try {
    const users = await userService.findAllUsersService();
    res.status(200).json({ users });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
}

async function findByIdController(req, res) {
  const { id } = req.params;

  try {
    const user = await userService.findUserByIdService(id);
    res.status(200).json({ user });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
}

async function updateUserController(req, res) {
  const { id } = req.params;
  const newUser = req.body;

  try {
    const user = await userService.updateUserService(newUser, id);
    res.status(200).json({ user });
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
}

async function deleteUserController(req, res) {
  const { id } = req.params;

  try {
    const message = await userService.deleteUserService(id);
    res.status(200).json(message);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
}

export default {
  createUserController,
  findAllUserController,
  findByIdController,
  updateUserController,
  deleteUserController,
};
