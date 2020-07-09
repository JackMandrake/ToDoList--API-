/**
 * Ce module va contenir tous nos handlers
 */
let handler = {

    /**
     * Méthode gérant la soumission du formulaire de création d'une tâche
     */
    handleAddTaskFormSubmit: function(evt) {
        console.log('handleAddTaskFormSubmit');

        // On bloque le fonctionnement par défaut du formulaire
        // pour éviter le rechargement de la page
        evt.preventDefault();

        // On crée l'élément correspondant à une nouvelle tâche à partir d'un template
        let newTaskTemplateElement = document.getElementById('task-template');
        console.log('newTaskTemplateElement : ',newTaskTemplateElement);
        // On récupère l'intérieur du template puis on le duplique
        let newTaskElement = newTaskTemplateElement.content.cloneNode(true);

        console.log('newTaskElement : ',newTaskElement);

        // On récupère le nom de la tâche à partir du champ input du form
        let formElement = evt.currentTarget;
        let newTaskValue = formElement.querySelector('.task__name-edit').value;

        console.log('newTaskValue : ',newTaskValue);

        // On vient préciser le nom de la tâche dans le clone de la tâche
        newTaskElement.querySelector('.task__name-display').textContent = newTaskValue;
        newTaskElement.querySelector('.task__name-edit').value = newTaskValue;

        console.log('newTaskElement : ',newTaskElement);

        // On vient préciser la catégorie dans le clone de la tâche
        let newTaskCategoryValue = formElement.querySelector('.task__category select').value;
        console.log('newTaskCategoryValue : ',newTaskCategoryValue);
        // On utilise dataset : https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset
        newTaskElement.querySelector('.task').dataset.category = newTaskCategoryValue;
        newTaskElement.querySelector('.task__category p').textContent = newTaskCategoryValue;

        // On ajoute les écouteurs d'évènements sur cette tâche
        app.bindSingleTaskEvents(newTaskElement);

        // On ajoute notre nouvelle tâche dans le DOM
        let tasksContainer = document.querySelector('.tasks');
        // prepend permet de rajouter l'élément en tant que 1er fils
        tasksContainer.prepend(newTaskElement);
    },

    /**
     * Méthode gérant le click sur bouton de complétion d'une tâche
     */
    handleCompleteButtonClick: function(evt) {
        console.log('handleCompleteButtonClick');

        // On récupère le bouton à l'origine de l'évènement
        let taskCompleteButtonElement = evt.currentTarget;
        console.log(taskCompleteButtonElement);

        // Pour changer l'affichage de la tâche, on a besoin de l'élément tâche
        // https://developer.mozilla.org/fr/docs/Web/API/Element/closest
        // closest va checher le premier ancêtre qui correspond au sélecteur fourni en argument
        let taskElement = taskCompleteButtonElement.closest('.task');
        console.log(taskElement);
        // On maintenant modifier les classes de la tâche (taskElement)
        // pour replace, on indique seulement le nom de la classe, sans le '.' car ici, on n'utilise
        // pas de sélecteur css
        taskElement.classList.replace('task--todo','task--complete');
        // replace est l'équivalent des 2 instructions suivantes :
        // taskElement.classList.remove('task--todo');
        // taskElement.classList.add('task--complete');
    },

    /**
     * Méthode gérant la validation de la modification du titre d'une tâche
     * avec la touche "entrée"
     */
    handleTaskTitleEnterKey: function(evt) {
        console.log('Je suis dans handleTaskTitleEnterKey');

        // On s'assure qu'on a bien tapé sur la touche Entrée
        if (evt.key == 'Enter') {
            // Je valide la modification du titre de la tâche
            // mais pas directement ici, j'utilise plutôt l'appel de handleTaskTitle
            // et je lui transmets l'event
            // console.log(evt.key);
            handler.handleTaskTitle(evt);
        }
    },

    /**
     * Méthode gérant la validation de la modification du titre d'une tâche
     */
    handleTaskTitle: function(evt) {
        console.log('Je suis dans handleTaskTitle');

        // On récupère l'élément input à l'origine de l'évènement
        let taskInputElement = evt.currentTarget;

        // On récupère la valeur de l'input
        let taskTitleValue = taskInputElement.value;

        // On cache l'input et on réaffiche le titre
        let taskElement = taskInputElement.closest('.task');
        taskElement.classList.remove('task--edit');

        // On récupère l'élément contenant le titre (balise <p>)
        // https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling
        let taskTitleElement = taskInputElement.previousElementSibling;
        // On modifie le contenu de la balise <p>
        taskTitleElement.textContent = taskTitleValue;
    },

    /**
     * Méthode gérant le changement d'état de la tâche permettant de rentrer
     * en mode édition
     */
    handleClickOnTaskTitle: function(evt) {
        console.log('Je suis dans handleClickOnTaskTitle');
        // On récupère l'élément à l'origine de l'évènement (click)
        // taskEditTitleElement est soit l'élément titre de la tâche (<p>), soit le bouton d'édition jaune
        let taskEditTitleElement = evt.currentTarget;

        console.log(evt);
        console.log(taskEditTitleElement);

        // On récupère l'élément tâche à partir de taskEditTitleElement
        // https://developer.mozilla.org/fr/docs/Web/API/Element/closest
        let taskElement = taskEditTitleElement.closest('.task');
        // La classe task--edit a un impact sur l'affichage d'une tâche
        // L'ajout de la classe task--edit permet de cacher l'élément <p>
        // contenant le titre de la tâche et d'afficher à la place l'élément input
        // permettant de modifier le titre de la tâche
        taskElement.classList.add('task--edit');

        // Bonus n°1 : ajout du focus pour être directement dans le champ d'édition
        let taskInputElement = taskElement.querySelector('.task__name-edit');
        // https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/focus
        taskInputElement.focus();
    }
};