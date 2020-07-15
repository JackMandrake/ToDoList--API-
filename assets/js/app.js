let app = {
    apiRootUrl: 'http://localhost:8080',
    
    init: function() {
        console.log('Méthode init');

        // On ajoute nos écouteurs d'évènements sur nos tâches
        // app.bindTasksEvents();
        // cet appel est obsolète maintenant que nous chargeons les tâches depuis l'API

        // On ajoute un écouteur d'évènement pour l'ajout d'une tâche
        app.bindAddTaskEvent();

        // On charge les tâches
        // task.loadTasks();
        // si on charge les tâches à ce moment là, et qu'on charge juste derrière les catégories,
        // alétoirement, on aura soit les catégories chargées avant les tâches
        // soit les tâches chargées avant les catégories
        // à cause de l'asynchronisme d'Ajax (on ne sait jamais quand la réponse va arriver et une fois
        // la requête ajax lancée, on continue pendant ce temps à exécuter le code situé après la requête)

        // On charge les catégories
        category.loadCategories();
    },

    bindAddTaskEvent: function() {
        // On récupère l'élément form permettant d'ajouter une tâche
        let addTaskFormElement = document.querySelector('.task--add form');
        // console.log('addTaskFormElement : ',addTaskFormElement);

        // On ajoute l'écouteur d'évènement pour la soumission du formulaire
        addTaskFormElement.addEventListener('submit',handler.handleAddTaskFormSubmit);
    },

    // Méthode chargée d'ajouter les écouteurs d'évènements sur toutes les tâches
    bindTasksEvents: function () {
        // On doit d'abord récupérer l'ensemble des tâches
        // https://developer.mozilla.org/fr/docs/Web/API/Document/querySelectorAll
        // Avec le :not() on peut exclure certains éléments avec notre sélecteur
        let existingTasks = document.querySelectorAll('.tasks .task:not(.task--add)');

        // On parcourt ensuite les tâches une par une
        for (let i = 0; i < existingTasks.length ; i++) {
            app.bindSingleTaskEvents(existingTasks[i]);
        }
    },

    // Méthode chargée d'ajouter les écouteurs d'évènements sur une tâche à la fois
    bindSingleTaskEvents: function(singleTaskElement) {
        // On cible le titre de la tâche
        let taskTitleElement = singleTaskElement.querySelector('.task__name-display');

        // Puis on ajoute l'écouteur d'évènement sur le clic
        // console.log('taskTitleElement : ',taskTitleElement);
        taskTitleElement.addEventListener('click',handler.handleClickOnTaskTitle);

        // On gère aussi l'édition du titre de la tâche depuis le bouton jaune
        singleTaskElement.querySelector('.task__button--modify').addEventListener('click',handler.handleClickOnTaskTitle);

        // On ajoute l'écouteur d'évènement sur le champ input contenant le titre
        let taskInputElement = singleTaskElement.querySelector('.task__name-edit');

        // Puis on ajoute l'écouteur d'évènement sur la perte de focus (blur)
        taskInputElement.addEventListener('blur',handler.handleTaskTitle);
        // Et on ajoute également l'écouteur d'évènement sur la validation avec la touche Entrée
        taskInputElement.addEventListener('keydown',handler.handleTaskTitleEnterKey);

        // On récupère le bouton permettant de compléter une tâche
        let taskCompleteButtonElement = 
            singleTaskElement.querySelector('.task__button--validate');

        console.log('Task Complete Button : ',taskCompleteButtonElement);

        // On ajoute l'écouteur d'évènement sur le bouton complete
        taskCompleteButtonElement.addEventListener('click',handler.handleCompleteButtonClick);

        // On ajoute l'écouteur d'évènement sur le bouton incomplete
        singleTaskElement.querySelector('.task__button--incomplete').addEventListener('click',handler.handleIncompleteButtonClick);
    },
};

document.addEventListener('DOMContentLoaded',app.init);