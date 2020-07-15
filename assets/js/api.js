let api = {
    
    init: function() {
      //  console.log('Méthode init');
        api.loadCategories();
        api.loadTasks();
    },

loadCategories: function(){
    /**
     * Options de la future requête HTTP
     */

    let myList = document.querySelector('#categorieslist1');
    let myListTwo = document.querySelector('#categorieslist');
    
    let fetchOptions = {
        // --- Toujours défini :
    
        // La méthode HTTP (GET, POST, etc.)
        method: 'GET',
    
        // --- Bonus (exemples) :
    
        // On utilisera souvent Cross Origin Resource Sharing qui apporte
        // une sécurité pour les requêtes HTTP effectuée avec XHR entre 2
        // domaines différents.
        mode: 'cors',
        // Veut-on que la réponse puisse être mise en cache par le navigateur ?
        // Non durant le développement, oui en production.
        cache: 'no-cache'
        
        // Si on veut envoyer des données avec la requête => décommenter et remplacer data par le tableau de données
        // , body : JSON.stringify(data)
    };
    
    
    /**
     * La fonction native fetch() permet de lancer une requête HTTP depuis JS.
     *
     * Dans DevTools > onglet "Network", on pourra voir cette requête avec le
     * filtre "XHR".
     *
     * Arguments de fetch() :
     * 1. l'URL à laquelle on veut accéder
     * 2. les options de cette requête HTTP
     */
    request = fetch('https://benoclock.github.io/S07-todolist/categories.json', fetchOptions);
    // La requête vient d'être envoyée !
    
    // On n'a pas encore la réponse, mais on se prépare déjà à la recevoir.
    // Une fois la réponse reçue, la fonction de callback précisée en argument
    // sera automatiquement appelée.
    request.then(
        // Cette fonction de callback est définie directement "à la volée" => fonction anonyme.
        // Elle recevra en argument la réponse brute provenant du serveur.
        function(response) {
        // On sait que la réponse est au format JSON (JavaScript Object Notation),
        // donc on transforme la réponse : conversion texte => objet JS
        return response.json();
        }
    )
    
    // On peut enchaîner les fonctions de traitement de la réponse.
    .then(
        // Celle-ci étant chaînée à la précédente, elle recevra en argument la réponse
        // précédemment convertie en objet JS.
        function(jsonResponse) {
        // Désormais, on a accès aux données facilement et on peut travailler avec :
        //console.log(jsonResponse);
    
        // TODO, utiliser ces données pour modifier la page, afficher les données, etc.
        for (var i = 0; i < jsonResponse.length; i++) {
            var listCategories = document.createElement('option');
            listCategories.innerHTML = '<strong>' + jsonResponse[i].name + '</strong>';
            
            myList.appendChild(listCategories);
        }

        for (var i = 0; i < jsonResponse.length; i++) {
            var listCategories = document.createElement('option');
            listCategories.innerHTML = '<strong>' + jsonResponse[i].name + '</strong>';
            
            myListTwo.appendChild(listCategories);
        }
    }
    );
    },

loadTasks: function(){
    /**
     * Options de la future requête HTTP
     */

    let myTasks = document.getElementById('task-template');
    let myTasksElement = myTasks.content.cloneNode(true);

    
    let fetchOptions = {
        // --- Toujours défini :
    
        // La méthode HTTP (GET, POST, etc.)
        method: 'GET',
    
        // --- Bonus (exemples) :
    
        // On utilisera souvent Cross Origin Resource Sharing qui apporte
        // une sécurité pour les requêtes HTTP effectuée avec XHR entre 2
        // domaines différents.
        mode: 'cors',
        // Veut-on que la réponse puisse être mise en cache par le navigateur ?
        // Non durant le développement, oui en production.
        cache: 'no-cache'
        
        // Si on veut envoyer des données avec la requête => décommenter et remplacer data par le tableau de données
        // , body : JSON.stringify(data)
    };
    
    
    /**
     * La fonction native fetch() permet de lancer une requête HTTP depuis JS.
     *
     * Dans DevTools > onglet "Network", on pourra voir cette requête avec le
     * filtre "XHR".
     *
     * Arguments de fetch() :
     * 1. l'URL à laquelle on veut accéder
     * 2. les options de cette requête HTTP
     */
    request = fetch('https://benoclock.github.io/S07-todolist/tasks.json', fetchOptions);
    // La requête vient d'être envoyée !
    
    // On n'a pas encore la réponse, mais on se prépare déjà à la recevoir.
    // Une fois la réponse reçue, la fonction de callback précisée en argument
    // sera automatiquement appelée.
    request.then(
        // Cette fonction de callback est définie directement "à la volée" => fonction anonyme.
        // Elle recevra en argument la réponse brute provenant du serveur.
        function(response) {
        // On sait que la réponse est au format JSON (JavaScript Object Notation),
        // donc on transforme la réponse : conversion texte => objet JS
        return response.json();
        }
    )
    
    // On peut enchaîner les fonctions de traitement de la réponse.
    .then(
        // Celle-ci étant chaînée à la précédente, elle recevra en argument la réponse
        // précédemment convertie en objet JS.
        function(jsonResponse) {
        // Désormais, on a accès aux données facilement et on peut travailler avec :
       // console.log(jsonResponse);
    
        // TODO, utiliser ces données pour modifier la page, afficher les données, etc.
        for (var i = 0; i < jsonResponse.length; i++) {
            var listCategories = document.createElement('div');
            listCategories.classList.add('task');
            listCategories.innerHTML = '<strong>' + jsonResponse[i].title + '</strong>';
            
            myTasks.appendChild(listCategories);
        }

        for (var i = 0; i < jsonResponse.length; i++) {
            var listCategories = document.createElement('option');
            listCategories.innerHTML = '<strong>' + jsonResponse[i].name + '</strong>';
            
            myListTwo.appendChild(listCategories);
        }
    }
    );
    },
}

document.addEventListener('DOMContentLoaded',api.init);

