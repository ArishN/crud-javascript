var tasks = document.querySelector('#tasks');

var add_form = document.querySelector('#add_form');

var task_name = document.querySelector('#task_name');
var task_description = document.querySelector('#task_description');
var update_btn = document.querySelector('#update_btn');

var toastContainer = document.querySelector('#toast_container');
var task_array = JSON.parse(localStorage.getItem('tasks')) || [];



add_form.addEventListener('submit', (e) =>{
    e.preventDefault();
    var taskElement1 = task_name.value;
    var taskElement2 = task_description.value;
    var task_json = {"name" : taskElement1,"description":taskElement2};
    task_array.push(task_json);
    localStorage.setItem('tasks',JSON.stringify(task_array));

window.location.reload();
      task_name.value = '';
      task_description.value = '';
    });
    


if(task_array.length > 0){
var taskconent ='';
    task_array.map((task_keys,index)=>{

      taskconent += ` <div class="tasks my-2 border row" >
      <div class="content_container my-3 col-md-10 p-2">
        <h1>${task_keys.name}</h1>
        <p class="task_desc">${task_keys.description}</p>
    </div>
        <div class="btn_container p-2 col-md-2 align-items-center justify-content-center d-flex">
        <div class="my-auto btn_inner d-flex p-3 gap-2">
        <button class="col-6 btn btn-success edit_btn"  data-bs-toggle="modal" data-bs-target="#modaledit-${index}"><ion-icon name="pencil-outline"></ion-icon></button>
       
        <button class="btn col-6 btn-danger delete_btn" id="delete_btn" data-index="${index}"><ion-icon name="trash-outline"></ion-icon></button>
    </div>
        </div>
        </div>

        <div class="modal fade" id="modaledit-${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="row g-3" id="update_form_${index}">
                    <div class="col-md-12">
                      <label for="inputEmail4" class="form-label">Task</label>
                      <input type="text" value="${task_keys.name}" class="form-control" id="update_task_name_${index}">
                      <input type="hidden" value="${index}" class="form-control" id="update_index_${index}">
                    </div>
                  
                    <div class="col-12">
                      <label for="inputAddress" class="form-label">Description</label>
                      <textarea name="update_task_description" class="form-control" id="update_task_description_${index}">${task_keys.description}</textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary update_btn" data-bs-dismiss="modal">Update</button>
                      </div>
                  </form>
            </div>
           
          </div>
        </div>
      </div>`;

    


    });
    tasks.innerHTML = taskconent;





}

for (let i = 0; i < task_array.length; i++) {

  var modelidname = '#update_form_' + i;
  var update_form = document.querySelector(modelidname);
update_form.addEventListener('submit',(e)=>{
e.preventDefault();
var update_task_name = document.querySelector('#update_task_name_' + i);
var update_task_description = document.querySelector('#update_task_description_' + i);

var update_index = document.querySelector('#update_index_' + i).value;

var taskElement1 = update_task_name.value;
var taskElement2 = update_task_description.value;
var task_json = {"name" : taskElement1,"description":taskElement2};

task_array[update_index] = task_json;
localStorage.setItem('tasks',JSON.stringify(task_array));


var toastMessage2 = `  <div class="toast show">
<div class="toast-header">
  <strong class="me-auto">Update</strong>
  <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
</div>
<div class="toast-body">
  <p>Task Updated Successfully</p>
</div>
</div>`;
toastContainer.innerHTML = toastMessage2;

setTimeout(()=>{
toastContainer.innerHTML = '';

},2000);
var taskElements = document.querySelectorAll('.tasks'); 
var updatedTaskElement = taskElements[update_index];

updatedTaskElement.querySelector('h1').textContent = taskElement1;
updatedTaskElement.querySelector('.task_desc').textContent = taskElement2;


})
  
}





var deleteButtons = document.querySelectorAll('#delete_btn');

deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      var index = e.currentTarget.getAttribute('data-index');
     
      task_array.splice(index, 1);
      
      var taskElement = e.currentTarget.closest('.tasks');
      taskElement.remove();
      
      localStorage.setItem('tasks', JSON.stringify(task_array));


      var toastMessage = `  <div class="toast show">
      <div class="toast-header">
        <strong class="me-auto">Delete</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        <p>Task Deleted Successfully</p>
      </div>
    </div>`;
    toastContainer.innerHTML = toastMessage;

    setTimeout(()=>{
      toastContainer.innerHTML = '';

    },2000);

    });
  });

  