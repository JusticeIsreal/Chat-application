const getRecipientEmail = (users, userLoggedIn) => {
  const arr = users.filter((user) => user !== userLoggedIn)[0];

  return arr;
};

export default getRecipientEmail;
// users.filter((user) => user !== session.user.email)[0];