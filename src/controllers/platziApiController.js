const { Article, Category } = require("../db.js");

const rellenarBase = async (req, res) => {
  try {
    await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "GET",
    })
      .then((data) => data.json())
      .then(async (answer) => {
        console.log(answer.length);
        for (let i = 0; i < answer.length; i++) {
          const newItem = await Article.create({
            title: answer[i].title,
            images: answer[i].images,
            price: answer[i].price,
            description: answer[i].description,
            stock: Math.floor(Math.random() * 100),
            categoryId: null,
          });

          const checkCategory = await Category.findOne({
            where: {
              name: answer[i].category.name,
            },
          });
          if (!checkCategory) {
            const newCategory = await Category.create({
              name: answer[i].category.name,
              image: answer[i].category.image,
            });
            await newCategory.addArticle(newItem.id);
            await Article.update(
              { categoryId: newCategory.id },
              { where: { id: newItem.id } }
            );
          } else {
            await checkCategory.addArticle(newItem.id);
            await Article.update(
              { categoryId: checkCategory.id },
              { where: { id: newItem.id } }
            );
          }
        }
      })
      .then(async () => {
        const list = await Article.findAll({ include: Category });
        return res.status(200).json(list);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  rellenarBase,
};
