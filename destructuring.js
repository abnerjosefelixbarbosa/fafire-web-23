const user = { name: "Keven", email: "kevn@ho.com" };

const { name, address, ...restUser } = user;

const users = [
  { name: "Keven", email: "kevn@ho.com" },
  { name: "Mario", email: "mario@ho.com" },
  { name: "Jose", email: "jose@ho.com" },
];

const [firstUser] = users;

const { email: firstUserEmail, name: firstUserName } = firstUser;

console.log(firstUserEmail, firstUserName);

return;
// const firstUserName = firstUser.name
// const firstUserEmail = firstUser.email

// const user = users[0]
// const user1 = users[1]

const email = "keven.leone@fafire.com";

const [username, domain] = email.split("@");

const columns = "name|email|address|company";

const [firstColumn, ...otherColumns] = columns.split("|");

// function sum(...values) {
//   let total = 0;

//   for (const value of values) {
//     total += value;
//   }

//   return total;
// }

const sum = (...values) =>
  values.reduce((prevValue, currentValue) => prevValue + currentValue);

console.log(sum(1, 2, 3, 4, 5));

console.log(otherColumns);
