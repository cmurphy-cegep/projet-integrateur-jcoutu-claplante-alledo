const { getAllRecettes } = require("../queries/RecetteQueries");

test("get all recipes", function () {
    const all = getAllRecettes()
    expect(() => { getAllRecettes(); }).toEqual(all);
});