let category = {
    categoriesName: [], // tableau qui va contenir une liste associant un category_id au nom de la catégorie

    /**
     * Méthode permettant de charger les catégories via une requête Ajax à l'API
     */
    loadCategories: function() {
        console.log('loadCategories');

        // On prépare la configuration de la requête HTTP
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch(app.apiRootUrl + '/categories', fetchOptions)
        // Ensuite, lorsqu'on reçoit la réponse au format JSON
        .then(function(response) {
            // On convertit cette réponse en un objet JS et on le retourne
            return response.json();
        })
        // Ce résultat au format JS est récupéré en argument ici-même
        .then(function(categoriesList) {
            
            console.log('categoriesList : ',categoriesList);

            // On va maintenant parcourir la liste de catégories une par une
            // et générer les 2 select pour le choix de la catégorie

            let selectElement = document.createElement('select');
            let firstOptionElement = document.createElement('option');
            firstOptionElement.textContent = 'Choisir une catégorie';
            selectElement.append(firstOptionElement);

            for (let i = 0 ; i < categoriesList.length ; i++) {
                // On récupère la catégorie courante pour ce tour de boucle
                let singleCategory = categoriesList[i];
                console.log(singleCategory);

                // On crée la nouvelle option
                let newOptionElement = document.createElement('option');
                newOptionElement.textContent = singleCategory.name;
                newOptionElement.value = singleCategory.id;

                // On vient placer la nouvelle option dans le select
                selectElement.append(newOptionElement);

                // On ajoute également une entrée dans la liste des noms de catégories pour associer category_id et le nom de la catégorie
                category.categoriesName[singleCategory.id] = singleCategory.name;
            }
            console.log(category.categoriesName);

            // On prépare un clone du select car on ne pourra l'ajouter 2 fois dans le DOM (une fois ajouté, le selectElement est en fait déplacé)
            // Si ajoute le même élément à un 1er endroit puis à un deuxième endroit
            // cet élément sera enlevé du 1er endroit pour être placé dans le deuxième endroit
            let secondSelectElement = selectElement.cloneNode(true);

            // On ajoute le select des catégories pour l'ajout d'une tâche
            document.querySelector('.task--add .task__category .select').append(selectElement);

            // On ajoute le select des catégories dans les filtres
            // et on lui ajout une classe particulière
            secondSelectElement.classList.add('filters__choice');
            document.querySelector('.filters__task--category').append(secondSelectElement);

            // Maintenant que mes catégories sont bien chargées, je peux demander le chargement des tâches
            task.loadTasks();
        });
        // A cause de l'asynchronisme de la requête Ajax =>
        console.log('Ce log est exécuté avant la réponse (then)');
    },
};