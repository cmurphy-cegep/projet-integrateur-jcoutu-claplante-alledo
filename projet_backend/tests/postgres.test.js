const { getAllRecettes } = require("../queries/RecetteQueries");

test("get all recipes", async () => {
    const recipes = await getAllRecettes()
    expect(recipes).toEqual(recipes);
});