jest.mock('../queries/DBPool');
const mockPool = require('../queries/DBPool');

const { getEtapesSelonRecetteId } = require('../queries/RecetteQueries');

const mockEtapes = [
    {id: 27, description: 'Préparer la sauce béchamel.', ordre: 1 },
    {id: 28, description: 'Assembler les couches de pâtes, viande et sauce.', ordre: 2 },
    {id: 29, description: 'Faire cuire au four.', ordre: 3 },
];

mockPool.query


test('getEtapesSelonRecetteId devrait retourner un tableau d\'étapes selon la recetteId', () => {
    const recetteId = 'lasagnes';
    const etapes = getEtapesSelonRecetteId(recetteId);
    expect(Array.isArray(etapes)).toBe(true);
    expect(etapes).toEqual(mockEtapes);
});