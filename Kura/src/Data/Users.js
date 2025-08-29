/** @format */

const users = [
  { id: 1, userName: "aakku", password: "@aakku" },
  { id: 2, userName: "ccn", password: "@ccn" },
];

export const getAllUsers = () => users;

export const findUserByCredentials = (username, password) => {
  return users.find(
    (user) => user.userName === username && user.password === password
  );
};

export const findUserByUsername = (username) => {
  return users.find((user) => user.userName === username);
};

export const addUser = (newUser) => {
  const user = {
    id: users.length + 1,
    ...newUser,
  };
  users.push(user);
  return user;
};

export default users;
