INSERT INTO Ingredient (nom) VALUES
('spaghetti'),
('pancetta'),
('œufs'),
('fromage parmesan'),
('poivre noir'),
('fettuccine'),
('blanc de poulet'),
('crème épaisse'),
('ail'),
('fromage parmesan'),
('tomates'),
('concombres'),
('olives'),
('fromage feta'),
('oignon rouge'),
('huile d’olive'),
('lanières de bœuf'),
('champignons'),
('oignon'),
('crème aigre'),
('bouillon de bœuf'),
('pâtes'),
('tomates concassées'),
('basilic'),
('ail en poudre'),
('poivron'),
('oignons'),
('aubergine'),
('courgette'),
('poulet'),
('lait de coco'),
('gingembre'),
('soja'),
('citron vert'),
('coriandre'),
('crème fraîche'),
('lardons'),
('champignons de paris'),
('vinaigre balsamique'),
('oeufs brouillés');


INSERT INTO recette (recette_id, nom, description, temps_preparation, temps_cuisson, nombre_portions, image) VALUES
('spaghetti_carbonara', 'Spaghetti Carbonara', 'Un plat classique italien qui allie la simplicité à l’élégance. Les spaghettis sont enrobés d’une sauce crémeuse aux œufs, rehaussée de fromage Pecorino Romano et de pancetta croustillante. \r\nLe poivre noir ajoute une touche épicée, complétant les saveurs riches de ce plat réconfortant. Parfait pour un repas rapide mais savoureux, la Carbonara est un incontournable de la cuisine italienne.', 10, 20, 4, 'carbonara.jpg'),
('poulet_alfredo', 'Poulet Alfredo', 'Ce plat met en valeur des fettuccines baignées dans une sauce Alfredo crémeuse, enrichie de beurre, de crème et de parmesan. \r\nLe poulet tendre apporte une touche de protéine qui complète cette expérience culinaire indulgente. Facile à préparer, ce plat est idéal pour les dîners en famille ou entre amis, offrant un goût raffiné avec un minimum d’effort.', 15, 25, 4, 'poulet_alfredo.jpg'),
('salade_grecque', 'Salade Grecque', 'Une explosion de fraîcheur avec des tomates juteuses, des concombres croquants, des olives savoureuses et du fromage feta salé. \r\nArrosée d’huile d’olive et relevée d’origan, cette salade est un incontournable des repas d’été. Elle est légère mais pleine de saveurs méditerranéennes, idéale pour accompagner des grillades ou pour être servie en entrée.', 10, 0, 4, 'salade_grecque.jpg'),
('boeuf_stroganoff', 'Boeuf Stroganoff', 'Ce plat d’origine russe est composé de lanières de bœuf tendre cuites dans une sauce riche et crémeuse à base de champignons et de crème fraîche. \r\nParfait pour les soirées d’hiver, il est généralement servi avec des pâtes, du riz ou de la purée de pommes de terre, offrant une combinaison parfaite de saveurs réconfortantes et de textures onctueuses.', 15, 30, 4, 'boeuf_stroganoff.jpg'),
('pates_a_la_bolognaise', 'Pâtes à la Bolognaise', 'Un grand classique de la cuisine italienne, ce plat combine des pâtes al dente avec une sauce bolognaise riche et savoureuse, faite de viande hachée, de tomates et d’herbes aromatiques. La cuisson lente permet de développer des saveurs profondes et intenses, rendant ce plat idéal pour les repas en famille ou entre amis.', 20, 45, 4, 'pates_bolognaise.jpg'),
('ratatouille', 'Ratatouille', 'Ce plat provençal célèbre les légumes d’été comme les courgettes, aubergines, tomates et poivrons, mijotés avec des herbes de Provence pour un mélange de saveurs méditerranéennes. \r\nLa ratatouille est polyvalente, pouvant être servie en plat principal ou en accompagnement, chaude ou froide. \r\nSa simplicité et ses couleurs vives en font un favori de la cuisine végétarienne.', 20, 40, 4, 'ratatouille.jpg'),
('poulet_au_curry', 'Poulet au Curry', 'Un plat réconfortant où le poulet tendre est mijoté dans une sauce au curry parfumée, mélangeant épices et crémeux. Parfait pour ceux qui aiment les plats épicés, ce curry est souvent servi avec du riz ou du pain naan pour absorber la sauce riche et aromatique. \r\nFacile à adapter selon les goûts, c’est un classique des cuisines du monde entier.', 15, 25, 4, 'poulet_curry.jpg'),
('lasagnes', 'Lasagnes', 'Un plat riche et réconfortant composé de couches de pâtes, d’une sauce à la viande savoureuse, de fromage fondant et de sauce béchamel. Ce plat au four est parfait pour les grandes réunions de famille, offrant une combinaison de textures et de saveurs qui séduisent petits et grands. Chaque bouchée est un délice, avec des couches bien équilibrées entre crémeux et croquant.', 30, 60, 6, 'lasagnes.jpg'),
('tarte_tatin', 'Tarte Tatin', 'Un dessert classique français où les pommes caramélisées sont cuites sous une croûte dorée, puis retournées pour être servies à l’envers. \r\nCe gâteau allie le croustillant de la pâte à la douceur fondante des pommes, avec un équilibre parfait entre sucré et acidulé. \r\nServie chaude, souvent accompagnée d’une boule de glace vanille, elle est un véritable délice.', 20, 50, 8, 'tarte_tatin.jpg'),
('crepes_suzette', 'Crêpes Suzette', 'Des crêpes fines et légères servies avec une sauce à l’orange, flambée au Grand Marnier ou au Cognac. Ce dessert français classique est à la fois simple et spectaculaire, avec un mariage de saveurs d’agrumes et de caramel qui ravit les papilles. Parfait pour une fin de repas élégante ou pour impressionner lors d’un dîner', 15, 10, 4, 'crepes_suzette.jpg'),
('soupe_a_l_oignon', 'Soupe à l’Oignon', 'Une soupe réconfortante à base d’oignons caramélisés et de bouillon, généralement servie gratinée avec du fromage fondu sur une tranche de pain. Cette spécialité française est parfaite pour les jours froids, offrant des saveurs riches et profondes, avec une douceur naturelle des oignons rehaussée par le bouillon savoureux. \r\nUn plat simple mais satisfaisant.', 15, 30, 4, 'soupe_oignon.jpg'),
('quiche_lorraine', 'Quiche Lorraine', 'Une quiche savoureuse garnie de lardons croustillants et de fromage, le tout enveloppé dans une pâte brisée dorée. Ce classique français est parfait pour un déjeuner ou un brunch, offrant une texture crémeuse à l’intérieur et croquante à l’extérieur. La quiche Lorraine est versatile et peut être dégustée chaude ou froide, seule ou accompagnée d’une salade verte.', 20, 40, 6, 'quiche_lorraine.jpg'),
('gratin_dauphinois', 'Gratin Dauphinois', 'Des tranches fines de pommes de terre cuites lentement dans une crème riche et onctueuse, parfumée à l’ail. \r\nCe gratin classique de la cuisine française est un accompagnement parfait pour les viandes rôties ou les plats en sauce. Sa texture fondante et son goût délicat en font un plat réconfortant et irrésistible.', 20, 60, 4, 'gratin_dauphinois.jpg'),
('chili_con_carne', 'Chili Con Carne', 'Un ragoût épicé originaire du sud des États-Unis, composé de viande hachée, haricots rouges, tomates et épices. Le chili est un plat convivial, souvent servi avec du riz, des tortillas ou du pain de maïs. Facile à personnaliser selon le niveau de piquant désiré, il est parfait pour les grandes réunions ou les repas réconfortants.', 20, 45, 6, 'chili_con_carne.jpg'),
('moussaka', 'Moussaka', 'Un gratin méditerranéen composé de couches d’aubergines, de viande hachée et de sauce béchamel. \r\nCe plat emblématique de la cuisine grecque est riche en saveurs, avec un équilibre parfait entre le crémeux de la béchamel et le goût légèrement fumé des aubergines. Cuit au four jusqu’à ce qu’il soit doré et bouillonnant, la moussaka est idéale pour les repas en famille.', 30, 60, 6, 'moussaka.jpg'),
('poulet_roti', 'Poulet Rôti', 'Un poulet entier rôti au four, assaisonné avec des herbes aromatiques et accompagné de légumes. Ce plat classique est synonyme de repas familial convivial, avec une peau croustillante et une viande juteuse. Facile à préparer, le poulet rôti est un favori des dimanches, offrant un repas complet et satisfaisant.', 20, 90, 4, 'poulet_roti.jpg'),
('gateau_au_chocolat', 'Gâteau au Chocolat', 'Un dessert riche et fondant, ce gâteau au chocolat est un incontournable pour les amateurs de chocolat. Avec sa texture moelleuse et son goût intense, il peut être servi nature, avec une ganache, ou accompagné de fruits ou de crème. Simple à réaliser, il est parfait pour toute occasion, qu’il s’agisse d’un anniversaire ou d’une fin de repas gourmande.', 20, 40, 8, 'gateau_chocolat.jpg'),
('curry_de_legumes', 'Curry de Légumes', 'Un mélange coloré de légumes variés mijotés dans une sauce au curry épicée et au lait de coco. Ce plat végétarien est à la fois nourrissant et plein de saveurs exotiques. \r\nParfait pour accompagner du riz ou du pain naan, il est facile à adapter selon les légumes de saison et les goûts personnels. C’est une option saine et savoureuse pour tous les jours.', 15, 30, 4, 'curry_legumes.jpg'),
('boeuf_bourguignon', 'Boeuf Bourguignon', 'Un ragoût de bœuf mijoté lentement avec du vin rouge, des légumes et des champignons, typique de la cuisine française. \r\nCe plat traditionnel est riche et savoureux, avec des morceaux de viande tendre et des arômes profonds. \r\nIdéal pour les repas d’hiver, il se sert souvent avec des pommes de terre ou des pâtes pour absorber la sauce généreuse.', 30, 120, 6, 'boeuf_bourguignon.jpg'),
('tiramisu', 'Tiramisu', 'Un dessert italien raffiné composé de couches de biscuits imbibés de café, de mascarpone crémeux et de cacao en poudre. \r\nLe tiramisu est un mélange parfait de douceur et d’amertume, avec une texture légère et onctueuse. Il est souvent servi bien frais, idéal pour conclure un repas avec élégance. \r\nFacile à préparer à l’avance, il gagne en saveur lorsqu’il repose un peu avant d’être dégusté.', 20, 0, 6, 'tiramisu.jpg');

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
