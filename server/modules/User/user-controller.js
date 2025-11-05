import User from "./user-model.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./user-service.js";

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password || !firstName || !lastName)
      return res
        .status(400)
        .json({ message: "Missing firstName, lastName,email or password" });

    const userAlreadyRegistered = await User.findOne({
      where: { email: email?.trim()?.toLowerCase() },
    });

    if (userAlreadyRegistered)
      return res.status(409).json({ message: `User is already registered` });

    const user = await createUser({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(201).json({ data: user });
  } catch (err) {
    console.error("register error:", err.message);
    return res.status(400).json({ message: err.message });
  }
};

const _getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId)
      return res.status(400).json({ message: `Missing required field userId` });

    const user = await getUser(userId);

    if (!user) return res.status(404).json({ message: `User not found` });

    return res.json({ data: user });
  } catch (error) {
    console.error("_getUser error:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

const _getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    return res.json({ data: users });
  } catch (error) {
    console.error("_getUser error:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

const _updateUser = async (req, res) => {
  try {
    const userId = req?.params?.userId?.trim();

    if (!userId)
      return res.status(400).json({ message: `Missing required field userId` });

    const { firstName, lastName, password, email } = req.body;

    const updatedUser = await updateUser({
      userId,
      firstName,
      lastName,
      email,
      password,
    });

    return res.json({ data: updatedUser });
  } catch (error) {
    console.error("_updateUser error:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

const _deleteUser = async (req, res) => {
  try {
    const userId = req?.params?.userId?.trim();

    if (!userId)
      return res.status(400).json({ message: `Missing required field userId` });

    const deletedUser = await deleteUser(userId);

    if (!deletedUser)
      return res.status(404).json({ message: `User not found` });

    return res.json({ success: true, deletedUser });
  } catch (error) {
    console.error("_deleteUser error:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

export { registerUser, _getUser, _getAllUsers, _deleteUser, _updateUser };
