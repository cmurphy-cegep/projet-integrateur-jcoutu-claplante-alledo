INSERT INTO Ingredient (nom) VALUES
('Spaghetti'),
('Pancetta'),
('Œufs'),
('Fromage Parmesan'),
('Poivre noir'),
('Fettuccine'),
('Blanc de Poulet'),
('Crème épaisse'),
('Ail'),
('Fromage Parmesan'),
('Tomates'),
('Concombres'),
('Olives'),
('Fromage Feta'),
('Oignon Rouge'),
('Huile d’Olive'),
('Lanières de Bœuf'),
('Champignons'),
('Oignon'),
('Crème aigre'),
('Bouillon de Bœuf'),
('Pâtes'),
('Tomates concassées'),
('Basilic'),
('Ail en poudre'),
('Poivron'),
('Oignons'),
('Aubergine'),
('Courgette'),
('Poulet'),
('Lait de Coco'),
('Gingembre'),
('Soja'),
('Citron vert'),
('Coriandre'),
('Crème fraîche'),
('Lardons'),
('Champignons de Paris'),
('Vinaigre balsamique'),
('Oeufs brouillés');


INSERT INTO recette (recette_id, nom, description, temps_preparation, temps_cuisson, nombre_portions, image) VALUES
('spaghetti_carbonara', 'Spaghetti Carbonara', 'Un plat classique italien de pâtes avec des œufs, du fromage, du pancetta et du poivre.', 10, 20, 4, 'carbonara.jpg'),
('poulet_alfredo', 'Poulet Alfredo', 'Sauce Alfredo crémeuse avec du poulet tendre servi sur des fettuccines.', 15, 25, 4, 'poulet_alfredo.jpg'),
('salade_grecque', 'Salade Grecque', 'Une salade fraîche avec des tomates, concombres, olives et fromage feta.', 10, 0, 4, 'salade_grecque.jpg'),
('boeuf_stroganoff', 'Boeuf Stroganoff', 'Des lanières de bœuf cuites dans une sauce crémeuse aux champignons.', 15, 30, 4, 'boeuf_stroganoff.jpg'),
('pates_a_la_bolognaise', 'Pâtes à la Bolognaise', 'Des pâtes servies avec une sauce à la viande riche et savoureuse.', 20, 45, 4, 'pates_bolognaise.jpg'),
('ratatouille', 'Ratatouille', 'Un mélange de légumes d’été mijotés avec des herbes de Provence.', 20, 40, 4, 'ratatouille.jpg'),
('poulet_au_curry', 'Poulet au Curry', 'Poulet tendre cuit dans une sauce au curry épicée.', 15, 25, 4, 'poulet_curry.jpg'),
('lasagnes', 'Lasagnes', 'Des couches de pâtes, viande, fromage et sauce béchamel.', 30, 60, 6, 'lasagnes.jpg'),
('tarte_tatin', 'Tarte Tatin', 'Une tarte aux pommes caramélisées, servie à l’envers.', 20, 50, 8, 'tarte_tatin.jpg'),
('crepes_suzette', 'Crêpes Suzette', 'Des crêpes fines servies avec une sauce à l’orange flambée.', 15, 10, 4, 'crepes_suzette.jpg'),
('soupe_a_l_oignon', 'Soupe à l’Oignon', 'Une soupe savoureuse à base d’oignons caramélisés et de bouillon.', 15, 30, 4, 'soupe_oignon.jpg'),
('quiche_lorraine', 'Quiche Lorraine', 'Une quiche salée garnie de lardons et de fromage.', 20, 40, 6, 'quiche_lorraine.jpg'),
('gratin_dauphinois', 'Gratin Dauphinois', 'Des pommes de terre tranchées cuites dans une crème riche.', 20, 60, 4, 'gratin_dauphinois.jpg'),
('chili_con_carne', 'Chili Con Carne', 'Un ragoût épicé de viande, haricots et tomates.', 20, 45, 6, 'chili_con_carne.jpg'),
('moussaka', 'Moussaka', 'Un gratin d’aubergines et de viande hachée avec une béchamel.', 30, 60, 6, 'moussaka.jpg'),
('poulet_roti', 'Poulet Rôti', 'Poulet entier rôti au four avec des herbes et des légumes.', 20, 90, 4, 'poulet_roti.jpg'),
('gateau_au_chocolat', 'Gâteau au Chocolat', 'Un gâteau riche et fondant au chocolat.', 20, 40, 8, 'gateau_chocolat.jpg'),
('curry_de_legumes', 'Curry de Légumes', 'Un curry épicé de légumes variés avec du lait de coco.', 15, 30, 4, 'curry_legumes.jpg'),
('boeuf_bourguignon', 'Boeuf Bourguignon', 'Un ragoût de bœuf mijoté avec du vin rouge et des légumes.', 30, 120, 6, 'boeuf_bourguignon.jpg'),
('tiramisu', 'Tiramisu', 'Un dessert italien à base de café, mascarpone et cacao.', 20, 0, 6, 'tiramisu.jpg');

INSERT INTO recette_ingredient (recette_id, ingredient_id, quantite, unite_mesure) VALUES
('spaghetti_carbonara', 1, 400, 'g'),
('spaghetti_carbonara', 2, 150, 'g'),
('spaghetti_carbonara', 3, 3, 'unités'),
('spaghetti_carbonara', 4, 100, 'g'),
('spaghetti_carbonara', 5, 2, 'cuillères à café'),

('poulet_alfredo', 6, 300, 'g'),
('poulet_alfredo', 7, 2, 'unités'),
('poulet_alfredo', 8, 250, 'ml'),
('poulet_alfredo', 9, 2, 'gousses'),
('poulet_alfredo', 10, 100, 'g'),

('salade_grecque', 11, 4, 'unités'),
('salade_grecque', 12, 2, 'unités'),
('salade_grecque', 13, 100, 'g'),
('salade_grecque', 14, 100, 'g'),
('salade_grecque', 15, 1, 'unité'),
('salade_grecque', 16, 3, 'cuillères à soupe'),

('boeuf_stroganoff', 17, 500, 'g'),
('boeuf_stroganoff', 18, 200, 'g'),
('boeuf_stroganoff', 19, 1, 'unité'),
('boeuf_stroganoff', 20, 150, 'ml'),

('pates_a_la_bolognaise', 22, 400, 'g'),
('pates_a_la_bolognaise', 23, 500, 'ml'),
('pates_a_la_bolognaise', 24, 10, 'feuilles'),
('pates_a_la_bolognaise', 25, 1, 'cuillère à café'),

('ratatouille', 27, 1, 'unité'),
('ratatouille', 28, 1, 'unité'),
('ratatouille', 29, 1, 'unité'),
('ratatouille', 24, 10, 'feuilles'),

('poulet_au_curry', 30, 500, 'g'),
('poulet_au_curry', 8, 200, 'ml'),
('poulet_au_curry', 9, 2, 'gousses'),
('poulet_au_curry', 32, 1, 'cuillère à soupe'),

('lasagnes', 22, 300, 'g'),
('lasagnes', 17, 400, 'g'),
('lasagnes', 36, 200, 'ml'),
('lasagnes', 37, 150, 'g'),

('tarte_tatin', 11, 5, 'unités'),
('tarte_tatin', 39, 2, 'cuillères à soupe'),

('crepes_suzette', 40, 4, 'unités'),
('crepes_suzette', 9, 1, 'cuillère à soupe'),
('crepes_suzette', 34, 1, 'cuillère à soupe'),

('soupe_a_l_oignon', 19, 500, 'g'),
('soupe_a_l_oignon', 21, 1, 'l'),
('soupe_a_l_oignon', 36, 100, 'ml'),

('quiche_lorraine', 37, 200, 'g'),
('quiche_lorraine', 17, 100, 'g'),
('quiche_lorraine', 36, 200, 'ml'),

('gratin_dauphinois', 22, 800, 'g'),
('gratin_dauphinois', 36, 250, 'ml'),

('chili_con_carne', 17, 400, 'g'),
('chili_con_carne', 23, 300, 'ml'),
('chili_con_carne', 25, 1, 'cuillère à café'),

('moussaka', 28, 300, 'g'),
('moussaka', 17, 500, 'g'),
('moussaka', 36, 200, 'ml'),

('poulet_roti', 30, 1, 'unité'),
('poulet_roti', 16, 2, 'cuillères à soupe'),

('gateau_au_chocolat', 40, 200, 'g'),
('gateau_au_chocolat', 36, 100, 'ml'),

('curry_de_legumes', 29, 200, 'g'),
('curry_de_legumes', 31, 200, 'ml'),
('curry_de_legumes', 32, 1, 'cuillère à café'),

('boeuf_bourguignon', 17, 800, 'g'),
('boeuf_bourguignon', 23, 500, 'ml'),
('boeuf_bourguignon', 21, 1, 'l'),

('tiramisu', 40, 250, 'g'),
('tiramisu', 34, 2, 'cuillères à soupe');

INSERT INTO Etape (description, ordre, recette_id) VALUES
('Faire cuire les spaghetti selon les instructions.', 1, 'spaghetti_carbonara'),
('Faire revenir la pancetta jusqu’à ce qu’elle soit croustillante.', 2, 'spaghetti_carbonara'),
('Mélanger les œufs et le fromage dans un bol.', 3, 'spaghetti_carbonara'),
('Ajouter la pancetta aux spaghetti cuits.', 4, 'spaghetti_carbonara'),
('Incorporer le mélange d’œufs et de fromage aux pâtes.', 5, 'spaghetti_carbonara'),

('Faire cuire les fettuccines selon les instructions.', 1, 'poulet_alfredo'),
('Faire revenir le poulet jusqu’à ce qu’il soit doré.', 2, 'poulet_alfredo'),
('Ajouter l’ail émincé et faire revenir encore.', 3, 'poulet_alfredo'),
('Ajouter la crème et le fromage, puis mélanger.', 4, 'poulet_alfredo'),
('Mélanger les fettuccines avec la sauce.', 5, 'poulet_alfredo'),

('Couper les légumes en morceaux.', 1, 'salade_grecque'),
('Mélanger les légumes avec les olives et le fromage.', 2, 'salade_grecque'),
('Assaisonner avec l’huile d’olive et le vinaigre.', 3, 'salade_grecque'),

('Faire revenir les lanières de bœuf.', 1, 'boeuf_stroganoff'),
('Ajouter les champignons et les oignons.', 2, 'boeuf_stroganoff'),
('Ajouter la crème et laisser mijoter.', 3, 'boeuf_stroganoff'),

('Faire cuire les pâtes selon les instructions.', 1, 'pates_a_la_bolognaise'),
('Préparer la sauce bolognaise en faisant revenir la viande.', 2, 'pates_a_la_bolognaise'),
('Ajouter les tomates concassées et les épices.', 3, 'pates_a_la_bolognaise'),
('Mélanger les pâtes avec la sauce.', 4, 'pates_a_la_bolognaise'),

('Couper les légumes en dés.', 1, 'ratatouille'),
('Faire revenir les légumes dans une poêle.', 2, 'ratatouille'),
('Ajouter les herbes et laisser mijoter.', 3, 'ratatouille'),

('Faire revenir le poulet avec des épices.', 1, 'poulet_au_curry'),
('Ajouter la crème et laisser mijoter.', 2, 'poulet_au_curry'),
('Servir avec du riz.', 3, 'poulet_au_curry'),

('Préparer la sauce béchamel.', 1, 'lasagnes'),
('Assembler les couches de pâtes, viande et sauce.', 2, 'lasagnes'),
('Faire cuire au four.', 3, 'lasagnes'),

('Caraméliser les pommes.', 1, 'tarte_tatin'),
('Préparer la pâte et la placer sur les pommes.', 2, 'tarte_tatin'),
('Faire cuire au four et retourner avant de servir.', 3, 'tarte_tatin'),

('Préparer la pâte à crêpes.', 1, 'crepes_suzette'),
('Faire cuire les crêpes.', 2, 'crepes_suzette'),
('Préparer la sauce à l''orange et servir sur les crêpes.', 3, 'crepes_suzette'),

('Faire revenir les oignons.', 1, 'soupe_a_l_oignon'),
('Ajouter le bouillon et laisser mijoter.', 2, 'soupe_a_l_oignon'),
('Servir avec du pain grillé.', 3, 'soupe_a_l_oignon'),

('Préparer la pâte et la garnir de lardons et de fromage.', 1, 'quiche_lorraine'),
('Faire cuire au four.', 2, 'quiche_lorraine'),

('Préparer les pommes de terre et les trancher.', 1, 'gratin_dauphinois'),
('Préparer la crème et mélanger avec les pommes de terre.', 2, 'gratin_dauphinois'),
('Faire cuire au four.', 3, 'gratin_dauphinois'),

('Faire revenir la viande.', 1, 'chili_con_carne'),
('Ajouter les haricots et les tomates.', 2, 'chili_con_carne'),
('Assaisonner et laisser mijoter.', 3, 'chili_con_carne'),

('Préparer les aubergines et les courgettes.', 1, 'moussaka'),
('Faire revenir la viande.', 2, 'moussaka'),
('Assembler les couches avec une béchamel.', 3, 'moussaka'),
('Faire cuire au four.', 4, 'moussaka'),

('Assaisonner le poulet.', 1, 'poulet_roti'),
('Faire cuire au four avec des légumes.', 2, 'poulet_roti'),

('Préparer la pâte et faire cuire au four.', 1, 'gateau_au_chocolat'),
('Préparer le glaçage et appliquer.', 2, 'gateau_au_chocolat'),

('Couper les légumes et les faire revenir.', 1, 'curry_de_legumes'),
('Ajouter le lait de coco et les épices.', 2, 'curry_de_legumes'),
('Laisser mijoter.', 3, 'curry_de_legumes'),

('Faire revenir la viande.', 1, 'boeuf_bourguignon'),
('Ajouter les légumes et le vin.', 2, 'boeuf_bourguignon'),
('Laisser mijoter.', 3, 'boeuf_bourguignon'),

('Préparer le mélange de mascarpone.', 1, 'tiramisu'),
('Assembler les couches avec le café et les biscuits.', 2, 'tiramisu'),
('Réfrigérer avant de servir.', 3, 'tiramisu');
