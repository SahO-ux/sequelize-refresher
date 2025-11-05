import User from "./user-model.js";

const createUser = async (params) => {
  const { firstName, lastName, email, password } = params;

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !password?.trim()
  )
    throw new Error("Required fields missing");

  const createdUser = await User.create({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim()?.toLowerCase(),
    password: password.trim(),
  });

  return {
    id: createdUser.id,
    firstName: createdUser.firstName,
    lastName: createdUser.lastName,
    email: createdUser.email,
  };
};

const getUser = async (userId) => {
  const _userId = userId.trim();
  if (!_userId) throw new Error("userId is required");

  const options = {
    attributes: ["id", "firstName", "lastName", "email"],
    // attributes: { exclude: ["updatedAt", "deletedAt"] } // Exclude values from resulting doc
  };

  const user = await User.findByPk(_userId, options);

  return user;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll();

  return allUsers;
};

const updateUser = async ({ userId, firstName, lastName, email, password }) => {
  const _userId = userId?.trim();
  if (!_userId) throw new Error("userId is required");

  const update = {
    ...(firstName?.trim() && { firstName: firstName?.trim() }),
    ...(lastName?.trim() && { lastName: lastName?.trim() }),
    ...(email?.trim() && { email: email?.trim()?.toLowerCase() }),
    ...(password?.trim() && { password: password?.trim() }),
  };

  if (!Object.keys(update).length) throw new Error("Nothing to update");

  // 1) Fetch instance (guarantees single-record update)
  const user = await User.findByPk(_userId);
  if (!user) throw new Error("User not found");

  // 2) Update instance (triggers beforeUpdate hooks)
  await user.update(update);

  // 3) Sanitize output (Send only required keys)
  const {
    password: _password,
    deletedAt,
    createdAt,
    ...sanitisedUser
  } = user.get({
    plain: true, // .lean() mongoose equivalent
  });

  return sanitisedUser;
};

const deleteUser = async (userId) => {
  const _userId = userId?.trim();

  if (!_userId) throw new Error("userId is required");

  const filter = {
    where: {
      id: _userId,
    },
    limit: 1, // Ensures only one record is affected if multiple somehow matched the ID (though unlikely with a primary key)
  };

  const options = {
    attributes: { exclude: ["updatedAt", "createdAt", "password"] }, // Exclude values from resulting doc
  };

  const deletedUser = await User.destroy(filter, options);

  return deletedUser;
};

export { createUser, getUser, getAllUsers, deleteUser, updateUser };
