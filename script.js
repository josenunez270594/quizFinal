class Tarea {
    constructor(description) {
      this.description = description;
      this.creationDate = new Date().toLocaleString();
      this.completed = false;
    }
  }
  
  const taskList = [];
  
  const taskDescriptionInput = document.getElementById('taskDescription');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const deleteTaskBtn = document.getElementById('deleteTaskBtn');
  const taskListElement = document.getElementById('taskList');
  const editModal = document.getElementById('editModal');
  const editTaskDescriptionInput = document.getElementById('editTaskDescription');
  const saveEditBtn = document.getElementById('saveEditBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  
  let selectedTaskIndex = null;
  
  function renderTasks() {
    taskListElement.innerHTML = '';
    taskList.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.toggle('completed', task.completed);
      li.innerHTML = `
        <span>${task.description} <small>(${task.creationDate})</small></span>
        <div>
          <input type="checkbox" onclick="toggleTask(${index})" ${task.completed ? 'checked' : ''} />
          <button class="edit-btn" onclick="openEditModal(${index})">Editar</button>
        </div>
      `;
      li.addEventListener('click', () => selectTask(index, li));
      taskListElement.appendChild(li);
    });
  }
  
  function addTask() {
    const description = taskDescriptionInput.value.trim();
    if (!description) {
      alert('La descripción de la tarea no puede estar vacía.');
      return;
    }
    const newTask = new Tarea(description);
    taskList.push(newTask);
    taskDescriptionInput.value = '';
    renderTasks();
  }
  
  function selectTask(index, listItem) {
    const listItems = document.querySelectorAll('#taskList li');
    listItems.forEach(item => item.classList.remove('selected'));
    listItem.classList.add('selected');
    selectedTaskIndex = index;
  }
  
  function deleteTask() {
    if (selectedTaskIndex === null) {
      alert('selecciona una tarea para eliminar ome ome deja de ser vago');
      return;
    }
    taskList.splice(selectedTaskIndex, 1);
    selectedTaskIndex = null;
    renderTasks();
  }
  
  function toggleTask(index) {
    taskList[index].completed = !taskList[index].completed;
    renderTasks();
  }
  
  function openEditModal(index) {
    selectedTaskIndex = index;
    editTaskDescriptionInput.value = taskList[index].description;
    editModal.style.display = 'flex';
  }
  
  function closeEditModal() {
    editModal.style.display = 'none';
  }
  
  function saveEdit() {
    const newDescription = editTaskDescriptionInput.value.trim();
    if (!newDescription) {
      alert('La descripción no puede estar vacía.');
      return;
    }
    taskList[selectedTaskIndex].description = newDescription;
    closeEditModal();
    renderTasks();
  }
  
  addTaskBtn.addEventListener('click', addTask);
  deleteTaskBtn.addEventListener('click', deleteTask);
  saveEditBtn.addEventListener('click', saveEdit);
  cancelEditBtn.addEventListener('click', closeEditModal);
  