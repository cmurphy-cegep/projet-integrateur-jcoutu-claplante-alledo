DROP TABLE IF EXISTS recette_ingredient;
DROP TABLE IF EXISTS commentaire;
DROP TABLE IF EXISTS appreciation;
DROP TABLE IF EXISTS etape;
DROP TABLE IF EXISTS recette;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS utilisateur;

CREATE TABLE utilisateur(
   utilisateur_id VARCHAR(50),
   nom_complet VARCHAR(50),
   mot_de_passe_hash VARCHAR(100) NOT NULL,
   mot_de_passe_sale VARCHAR(100) NOT NULL,
   est_admin boolean NOT NULL DEFAULT false,
   PRIMARY KEY(utilisateur_id)
);

CREATE TABLE recette(
   recette_id VARCHAR(50),
   nom VARCHAR(50),
   description VARCHAR(700),
   temps_preparation INT,
   temps_cuisson INT,
   nombre_portions INT,
   image VARCHAR(50),
   PRIMARY KEY(recette_id)
);

CREATE TABLE commentaire(
   commentaire_id serial PRIMARY KEY,
   texte VARCHAR(700),
   date_publication timestamp with time zone NOT NULL,
   utilisateur_id VARCHAR(50) NOT NULL,
   recette_id VARCHAR(50),
   FOREIGN KEY(utilisateur_id) REFERENCES Utilisateur(utilisateur_id),
   FOREIGN KEY(recette_id) REFERENCES Recette(recette_id)
);

CREATE TABLE appreciation(
   appreciation_id serial PRIMARY KEY,
   etoiles INT NOT NULL,
   recette_id VARCHAR(50),
   utilisateur_id VARCHAR(50) NOT NULL,
   FOREIGN KEY(recette_id) REFERENCES Recette(recette_id),
   FOREIGN KEY(utilisateur_id) REFERENCES Utilisateur(utilisateur_id)
);

CREATE TABLE ingredient(
   ingredient_id serial PRIMARY KEY,
   nom VARCHAR(50)
);

CREATE TABLE etape(
   etape_id serial PRIMARY KEY,
   description VARCHAR(700),
   ordre INT,
   recette_id VARCHAR(50) NOT NULL,
   FOREIGN KEY(recette_id) REFERENCES Recette(recette_id)
);

CREATE TABLE recette_ingredient(
   recette_id VARCHAR(50),
   ingredient_id INT,
   quantite numeric(6,2),
   unite_mesure VARCHAR(50),
   ordre INT,
   PRIMARY KEY(recette_id, ingredient_id),
   FOREIGN KEY(recette_id) REFERENCES Recette(recette_id),
   FOREIGN KEY(ingredient_id) REFERENCES Ingredient(ingredient_id)
);
