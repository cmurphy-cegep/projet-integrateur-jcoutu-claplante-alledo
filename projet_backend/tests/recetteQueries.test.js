jest.mock('../queries/DBPool');
const mockPool = require('../queries/DBPool');
const { getEtapesSelonRecetteId } = require('../queries/RecetteQueries');

test('getEtapesSelonRecetteId devrait retourner un tableau d\'étapes selon la recetteId', async () => {
    // Doit avoir le bon nom de variable pour faire la queries
    const mockEtapes = [
        { etape_id: 27, description: 'Préparer la sauce béchamel.', ordre: 1 },
        { etape_id: 28, description: 'Assembler les couches de pâtes, viande et sauce.', ordre: 2 },
        { etape_id: 29, description: 'Faire cuire au four.', ordre: 3 },
    ];

    mockPool.query.mockResolvedValueOnce({ rows: mockEtapes });
    
    const recetteId = 'lasagnes';
    const etapes = await getEtapesSelonRecetteId(recetteId);

    // Doit rechanger le nom pour avoir le bon nom de variable comme dans le return de la fonction
    const ExpectedmockEtapes = [
        { id: 27, description: 'Préparer la sauce béchamel.', ordre: 1 },
        { id: 28, description: 'Assembler les couches de pâtes, viande et sauce.', ordre: 2 },
        { id: 29, description: 'Faire cuire au four.', ordre: 3 },
    ];
    

    expect(Array.isArray(etapes)).toBe(true);
    expect(etapes).toEqual(ExpectedmockEtapes);
});

