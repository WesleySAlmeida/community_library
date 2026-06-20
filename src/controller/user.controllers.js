import createUserService from "../service/user.services.js";

export async function createUserController(req, res) {
  const newUser = req.body;

  try {
    const user = await createUserService(newUser); // <-- await aqui
    res.status(201).json({ user }); // ou com mensagem, se quiser igual ao curso
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
