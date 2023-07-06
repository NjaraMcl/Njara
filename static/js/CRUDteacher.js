
function handleTeacherList() {
    axios.get('/api/Teacher-list')
    .then(response => {
        const data = response.data;
        const table = document.createElement('table');
        const tableBody = document.createElement('tbody');
        

        // Create table header row
        const headerRow = document.createElement('tr');
        const headers = Object.keys(data[0]);

        headers.forEach(header => {
            if (!['id', 'slug', 'dob', 'pob', 'date_added', 'date_updated', 't_user'].includes(header)) { // Exclude multiple headers
                const th = document.createElement('th');
                th.textContent = capitalizeFirstLetter(header); // Capitalize first letter of header
                headerRow.appendChild(th);
            }
        });
        // Add additional headers for the edit and delete buttons
        const editHeader = document.createElement('th');
        editHeader.textContent = 'Edit';
        headerRow.appendChild(editHeader);

        const deleteHeader = document.createElement('th');
        deleteHeader.textContent = 'Delete';
        headerRow.appendChild(deleteHeader);

        tableBody.appendChild(headerRow);

        // Create table rows with data
        data.forEach(rowData => {
            const row = document.createElement('tr');

            headers.forEach(header => {
                if (!['id', 'slug', 'dob', 'pob', 'date_added', 'date_updated', 't_user'].includes(header)) { // Exclude multiple headers
                    const cell = document.createElement('td');
                    cell.textContent = rowData[header];
                    // Add a class to the td element
                    cell.classList.add('text-center', 'uppercase');
                    row.appendChild(cell);
                }
            });
            // Add edit and delete buttons to each row
            const editButtonCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.innerHTML = '<span class="btn-icon"><i class="fa fa-edit"></i></span> <span class="btn-name">Edit</span>';
            editButton.classList.add('text-center', 'edit-button');
            editButtonCell.appendChild(editButton);
            row.appendChild(editButtonCell);
            // Add event listener to edit button
            editButton.addEventListener('click', function() {
                openEditModal(rowData.id);
            });

            const deleteButtonCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<span class="btn-icon"><i class="fa fa-trash"></i></span> <span class="btn-name">Delete</span>';
            deleteButton.classList.add('text-center', 'delete-button');
            deleteButtonCell.appendChild(deleteButton);
            row.appendChild(deleteButtonCell);
            // Add event listener to delete button
            deleteButton.addEventListener('click', function() {
                deleteTeacher(rowData.id);
            });

            tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        const element = document.getElementById('teacherlist-warper');
        element.appendChild(table);
    })
    .catch(function (error) {
        console.error(error);
        // Handle any errors here
    });
}
handleTeacherList()
// Function to capitalize the first letter of each word
function capitalizeFirstLetter(text) {
    return text.replace(/\b\w/g, firstChar => firstChar.toUpperCase());

}
// Function to retrieve the value of a cookie by name
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function deleteTeacher(teacherId) {
    const csrftoken = getCookie('csrftoken'); // Retrieve the CSRF token from the cookie
  
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Set the CSRF token in the request headers
  
    axios.delete(`/api/Teacher-delete/${teacherId}/`)
      .then(function (response) {
        console.log('Teacher deleted successfully:', response.data);
        // Handle the response or perform any additional actions here
        // For example, you can refresh the teacher list
        window.location.reload();
      })
      .catch(function (error) {
        console.error('Error deleting teacher:', error);
        // Handle the error here
      });
}
function handleEdit(teacherId) {
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

    axios.get(`/api/Teacher-detail/${teacherId}/`)
        .then(response => {
            // Get the data from the response
            const teacherData = response.data;
            const formFields = [
                { label: 'Nom', name: 'nom', value: teacherData.nom },
                { label: 'Prenom', name: 'prenom', value: teacherData.prenom },
                { label: 'slug', name: 'slug', value: teacherData.slug },
                { label: 'Gender', name: 'gender'},
                { label: 'Birth date', name: 'dob', value: teacherData.dob },
                { label: 'Birth place', name: 'pob', value: teacherData.pob }
            ];
            const formElements = formFields.map(field => {
                return `
                  <div class="form-group nj-formLabelImput">
                    <label for="${field.name}">${field.label}:</label>
                    <input type="text" id="${field.name}" name="${field.name}" value="${field.value}" class="form-control" required>
                  </div>
                `;
            });

            // Update the modal content with the teacher's data
            const modalContent = `
                <form id="editForm" class="editForm">
                ${formElements.join('')}
                <button aria-label="Save" type="submit" class="modal-submit-btn">Save</button>
                </form>
            `;

            // Set the content of the modal
            const njcardtitle = document.getElementById("nj-card-title");
            const njcardform = document.getElementById("nj-card-form");
            njcardtitle.textContent = teacherData.nom + " " + teacherData.prenom;
            njcardform.innerHTML = modalContent;
            const editForm = document.getElementById('editForm');
            editForm.addEventListener('submit', event => handleEditFormSubmit(event, teacherId));
        })
    
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
}
function handleEditFormSubmit(event, teacherId) {
    event.preventDefault();
  
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
  
    const formData = new FormData(event.target);
    const nom = formData.get('nom');
    const prenom = formData.get('prenom');
    const slug = formData.get('slug');
    const gender = formData.get('gender');
    const dob = formData.get('dob');
    const pob = formData.get('pob');
  
    axios.post(`/api/Teacher-update/${teacherId}/`, {
        nom: nom,
        prenom: prenom,
        slug: slug,
        gender: gender,
        dob: dob,
        pob: pob,
      // Include other fields in the request data object
    })
      .then(response => {
        // Handle the response if needed
        // console.log(response.data);
        // window.location.href = '/Teacher/list/'; 
        const teacherlistwarper = document.getElementById('teacherlist-warper');
        teacherlistwarper.innerHTML = " ";
        handleTeacherList()
        // Close the modal or update the UI as desired
        closeModal("nj-modalEdit")
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
}
  
function openEditModal(teacherId) {
    const njmodal = document.getElementById("nj-modalEdit");
    const njoverlay = document.getElementById("overlay");
    
    njmodal.classList.remove("hidden");
    njoverlay.classList.remove("hidden");
    handleEdit(teacherId)
}

function handleCreate() {
    const formFields = [
        { label: 'Nom', name: 'nom'},
        { label: 'Prenom', name: 'prenom'},
        { label: 'Gender', name: 'gender'},
        { label: 'Birth date', name: 'dob'},
        { label: 'Birth place', name: 'pob'}
    ];
    const formElements = formFields.map(field => {
        return `
          <div class="form-group nj-formLabelImput">
            <label for="${field.name}">${field.label}:</label>
            <input type="text" id="${field.name}" name="${field.name}" class="form-control" required>
          </div>
        `;
    });
    const modalContent = `
                <form id="createForm" class="createForm">
                ${formElements.join('')}
                <button aria-label="Add" type="submit" class="modal-submit-btn">Add</button>
                </form>
            `;
    const njcardtitle = document.getElementById("nj-card-title");
    const njcardform = document.getElementById("nj-card-createform");
    njcardtitle.textContent = "";
    njcardform.innerHTML = modalContent;
    const createForm = document.getElementById('createForm');
    createForm.addEventListener('submit', event => handleCreateFormSubmit(event));
}

function handleCreateFormSubmit(event){
    event.preventDefault();
  
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    const formData = new FormData(event.target);
    // Create the data object for the new item
    const newItemData = {};
    for (let [key, value] of formData.entries()) {
        newItemData[key] = value;
    }
    //console.log(newItemData);
    axios.post('/api/Teacher-create/', { 
        nom: newItemData.nom,
        prenom: newItemData.prenom,
        gender: newItemData.gender,
        dob: newItemData.dob,
        pob: newItemData.pob,
    })
    .then(response => {
        // Handle the response from the API
        // console.log("New item created:", response.data);
        // window.location.href = '/Teacher/list/'; 
        // Perform any necessary UI updates or redirect to a different page
        const teacherlistwarper = document.getElementById('teacherlist-warper');
        teacherlistwarper.innerHTML = " ";
        handleTeacherList()
        // Close the modal or update the UI as desired
        closeModal("nj-modalCreate")
    })
    //.catch(error => {
        // Handle any errors that occurred during the API request
        //console.error("Error creating item:", error);
        // Perform any necessary error handling or display error messages to the user
    //});
}
function openCreateModal() {
    const njmodal = document.getElementById("nj-modalCreate");
    const njoverlay = document.getElementById("overlay");
    
    njmodal.classList.remove("hidden");
    njoverlay.classList.remove("hidden");
    handleCreate()
}

function closeModal(modal) {
    const njmodal = document.getElementById(modal);
    const njoverlay = document.getElementById("overlay");
    njmodal.classList.add("hidden");
    njoverlay.classList.add("hidden");
}



