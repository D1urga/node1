const data = { name: "anoop", edu: "vit" };

const cont1 = (req, res) => {
  res.send("hello");
};
const cont2 = (req, res) => {
  res.json(data);
};

export { cont1, cont2 };
