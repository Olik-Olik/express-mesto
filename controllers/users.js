const usersData = require('../users.json');
// const getUsers = (req, res) => {return res.send(usersData); };
const getUsers = (req, res) => res.send(usersData);
module.exports = { getUsers };
