const data = { name: "anoop", edu: "vit" };
const data2 = {
  employees: [
    { name: "Shyam", email: "shyamjaiswal@gmail.com" },
    { name: "Bob", email: "bob32@gmail.com" },
    { name: "Jai", email: "jai87@gmail.com" },
  ],
};

const cont1 = (req, res) => {
  res.send("hello");
};
const cont2 = (req, res) => {
  res.json(data2);
};

export { cont1, cont2 };
