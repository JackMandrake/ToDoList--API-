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

                task.createNewTaskIntoDOM(singleTask.id, singleTask.title, singleTask.category_id, singleTask.completion);
            }

        });
    },

    addNewTask: function(newTaskTitle, newTaskCategoryId) {
        // On stocke les données à transférer
        let data = {
            title: newTaskTitle,
            categoryId: newTaskCategoryId
        };
        
        // On prépare les entêtes HTTP (headers) de le requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        let fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: myHeaders,
            // On ajoute les données, encodée en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
        
        // Exécuter la requête HTTP via XHR
        fetch(app.apiRootUrl + '/tasks', fetchOptions)
        .then(
            function(response) {
                console.log(response);
                // Si HTTP status code à 201 => OK
                if (response.status == 201) {
                    console.log('Tâche ajoutée avec succès');
                    // TODO d'autres choses, certainement
                    return response.json();
                }
                else {
                    alert('L\'ajout de la tâche a échoué');
                }
            }
        ).then(
            function(newTask) {
                // console.log('newTaks ', newTask);
                task.createNewTaskIntoDOM(newTask.id, newTask.title, newTask.category_id, newTask.completion);
            }
        )
    },

    /**
     * Méthode permettant de créer une nouvelle tâche et de l'ajouter dans le DOM
     */
    createNewTaskIntoDOM: function(taskId, title, categoryId, completion) {

        // On crée l'élément correspondant à une nouvelle tâche à partir d'un template
        let newTaskTemplateElement = document.getElementById('task-template');

        // On récupère l'intérieur du template puis on le duplique
        // Dans notre cas, le clone ne retourne pas directement l'élément task
        // => donc on refait un querySelector('.task') pour récupérer l'élément
        // task proprement dit
        let newTaskElement = newTaskTemplateElement.content.cloneNode(true).querySelector('.task');

        // On vient préciser le nom de la tâche dans le clone de la tâche
        newTaskElement.querySelector('.task__name-display').textContent = title;
        newTaskElement.querySelector('.task__name-edit').value = title;

        // Mise à jour du nom de la catégorie
        // category.categoriesName est un tableau associant l'id d'une catégorie à son nom
        // grâce à ce tableau, on peut à partir de la propriété category_id
        // présente sur chaque tâche, retrouver le nom de la catégorie
        let categoryName = category.categoriesName[categoryId];
        // On utilise dataset : https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset
        // dataset.category va créer sur l'élément task un attribut data-category
        // dataset.taskId va créer sur l'élément task un attribut data-task-id
        newTaskElement.dataset.category = categoryName;
        newTaskElement.querySelector('.task__category p').textContent = categoryName;

        // Mise à jour de l'id de la tâche
        newTaskElement.dataset.taskId = taskId;

        task.setTaskCompletion(newTaskElement, completion);
 
        // On ajoute les écouteurs d'évènements sur cette tâche
        app.bindSingleTaskEvents(newTaskElement);

        // On ajoute notre nouvelle tâche dans le DOM
        let tasksContainer = document.querySelector('.tasks');
        // prepend permet de rajouter l'élément en tant que 1er fils
        tasksContainer.prepend(newTaskElement);
    },

    /**
     * Cette méthode va à partir d'un élément tâche faire un requête Ajax
     * à l'API pour valider la complétion côté BDD puis si c'est ok côté API
     * => alors on pourra mettre à jour l'interface côté front et passer la tâche
     * en complete
     */
    completeTask: function(taskElement) {

        // On récupère l'id de la tâche qu'on avait stocké dans un attribut data
        // au moment de la création de la tâche dans le DOM
        let taskId = taskElement.dataset.taskId;

        // Compléter une tâche revient à mettre sa complétion à 100
        let taskCompletion = 100;

        // On stocke les données à transférer
        let data = {
            completion: taskCompletion
        };
        
        // On prépare les entêtes HTTP (headers) de le requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: myHeaders,
            // On ajoute les données, encodée en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
        
        // Exécuter la requête HTTP via XHR
        fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                    console.log('Tâche mise à jour avec succès');
        
                    // TODO d'autres choses, certainement
                    task.setTaskCompletion(taskElement, taskCompletion);
                }
                else {
                    alert('La mise à jour de la tâche a échoué');
                }
            }
        )
    },

    /**
     * Cette méthode permet de mettre à jour visuellement un élément tâche
     * en modifiant le niveau de complétion de celle-ci
     */
    setTaskCompletion: function(taskElement, completion) {

        // On peut commencer par mettre à jour la barre de complétion
        taskElement.querySelector('.progress-bar__level').style.width = completion + '%';

        if (completion == 100) {
            // On maintenant modifier les classes de la tâche (taskElement)
            // pour replace, on indique seulement le nom de la classe, sans le '.' car ici, on n'utilise
            // pas de sélecteur css
            taskElement.classList.replace('task--todo','task--complete');
            // replace est l'équivalent des 2 instructions suivantes :
            // taskElement.classList.remove('task--todo');
            // taskElement.classList.add('task--complete');
        } else {
            taskElement.classList.replace('task--complete','task--todo');
        }
    },
};