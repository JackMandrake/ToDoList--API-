let task = {

    /**
     * Méthode permettant de charger les tâches via une requête Ajax à l'API
     */
    loadTasks: function() {
        console.log('loadTasks');

        // On prépare la configuration de la requête HTTP
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch(app.apiRootUrl + '/tasks', fetchOptions)
        // Ensuite, lorsqu'on reçoit la réponse au format JSON
        .then(function(response) {
            // On convertit cette réponse en un objet JS et on le retourne
            return response.json();
        })
        // Ce résultat au format JS est récupéré en argument ici-même
        .then(function(tasksList) {
            
            console.log('tasksList : ',tasksList);

            // On va maintenant parcourir la liste de tâches une par une
            // et générer les tâches dans le DOM

            // let selectElement = document.createElement('select');
            // let firstOptionElement = document.createElement('option');
            // firstOptionElement.textContent = 'Choisir une catégorie';
            // selectElement.append(firstOptionElement);

            for (let i = 0 ; i < tasksList.length ; i++) {
                // On récupère la tâche courante pour ce tour de boucle
                let singleTask = tasksList[i];
                console.log(singleTask);

                let singleTaskCategoryName = category.categoriesName[singleTask.category_id];
                task.createNewTask(singleTask.id, singleTask.title,singleTaskCategoryName);
            }

        });
    },

    /**
     * Méthode permettant de créer une nouvelle tâche et de l'ajouter dans le DOM
     */
    createNewTask: function(taskId, title,categoryName) {

        // On crée l'élément correspondant à une nouvelle tâche à partir d'un template
        let newTaskTemplateElement = document.getElementById('task-template');

        // On récupère l'intérieur du template puis on le duplique
        let newTaskElement = newTaskTemplateElement.content.cloneNode(true);

        // On vient préciser le nom de la tâche dans le clone de la tâche
        newTaskElement.querySelector('.task__name-display').textContent = title;
        newTaskElement.querySelector('.task__name-edit').value = title;

        // On utilise dataset : https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset
        newTaskElement.querySelector('.task').dataset.category = categoryName;
        newTaskElement.querySelector('.task').dataset.taskId = taskId;
        newTaskElement.querySelector('.task__category p').textContent = categoryName;
 
        // On ajoute les écouteurs d'évènements sur cette tâche
        app.bindSingleTaskEvents(newTaskElement);

        // On ajoute notre nouvelle tâche dans le DOM
        let tasksContainer = document.querySelector('.tasks');
        // prepend permet de rajouter l'élément en tant que 1er fils
        tasksContainer.prepend(newTaskElement);
    }
};