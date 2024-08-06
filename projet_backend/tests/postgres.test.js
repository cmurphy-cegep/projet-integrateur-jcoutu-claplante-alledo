const { getAllRecettes } = require("../queries/RecetteQueries");

test("get all recipes", async () => {
    const recipes = await getAllRecettes()
    console.log(recipes)
    expect(recipes).toEqual(recipes);
});