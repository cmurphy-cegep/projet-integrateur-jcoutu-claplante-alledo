describe('Tests bout en bout projet recettes Rodrigo', function() {


    it('connexion d\'un utilisateur', function (browser) {

        browser

        .navigateTo('http://localhost:5173/connexion/')
        
        .assert.elementPresent('#nomCompte')

        .sendKeys('#nomCompte', 'claplante')

        .assert.elementPresent('#motDePasse')

        .sendKeys('#motDePasse', ['12345', browser.Keys.ENTER])

        .pause(500)

        .getAlertText(function(result) {
            this.assert.equal(result.value, 'Bienvenue, Catherine Laplante.');
        })   

        .end();

    });

    

    it('vérification de la présence de l\'appréciation', function(browser){

        browser
        
        .navigateTo('http://localhost:5173/recettes/spaghetti_carbonara/')

        .waitForElementPresent('h2 > div', 5000)
        
        .assert.elementPresent('h2 > div');
        
    });

    it('redirection correcte vers la page de recette detaillee selon la recette choisie', function(browser){

        browser

        .navigateTo('http://localhost:5173/recettes/')

        .expect.element('#recette-liste > div > div:nth-child(1) > div > a > div > div.recette-info > div.recette-nom').text.to.equal('Spaghetti Carbonara');

        browser

        .click('#recette-liste > div > div:nth-child(1) > div > a')

        .assert.urlContains('/recettes/spaghetti_carbonara');
    });

    it('ajouter un commentaire', function(browser){

        browser

        .navigateTo('http://localhost:5173/connexion/')
        
        .assert.elementPresent('#nomCompte')

        .sendKeys('#nomCompte', 'claplante')

        .assert.elementPresent('#motDePasse')

        .sendKeys('#motDePasse', ['12345', browser.Keys.ENTER])

        .pause(500)
      
        browser.dismissAlert()

        browser

        .pause(200)

        .navigateTo('http://localhost:5173/recettes/spaghetti_carbonara/')

        .element('div.recette-conteneur4 > h3 > button').click()

        browser

        .pause(200)

        .sendKeys('#commentaire-texte', 'Test de Nightwatch')

        .element('div.recette-conteneur4 > div:nth-child(2) > form > button:nth-child(3)').click()

        browser

        .getText('div.recette-conteneur4', function(result) {
            this.assert.ok(result.value.includes, 'Test de Nightwatch');
        })  
    });
});