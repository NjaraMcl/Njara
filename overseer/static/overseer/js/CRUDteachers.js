
function handleTeacherList() {
    axios.get('/api/Teacher-list')
    .then(response => {
        const data = response.data;
        const tableContainer = document.createElement('div');
        const table = document.createElement('table');
        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');

        if (data.length === 0) {
            const spinnerElement = document.getElementById('spinner'); 
            setTimeout(() => {
                    spinnerElement.classList.add('spinnerNotVisible');
                
                    const noDataParagraph = document.createElement('p');
                    noDataParagraph.classList.add('text-center', 'uppercase', 'text-red', 'text-bold');
                    noDataParagraph.textContent = 'No Data ';
                    const iconElement = document.createElement('i');
                    iconElement.classList.add('fa-solid', 'fa-triangle-exclamation', 'fa-fade');
                    noDataParagraph.appendChild(iconElement);
                    const element = document.getElementById('teacherlist-warper');
                    element.appendChild(noDataParagraph);
                    return;
                }, 500
            );
        } else {
            const spinnerElement = document.getElementById('spinner'); 
            setTimeout(() => {
                    spinnerElement.classList.add('spinnerNotVisible');
        
                    const headers = Object.keys(data[0]);
                    // Create table header row
                    const headerRow = document.createElement('tr');
                    headers.forEach(header => {
                        if (!['id', 'slug', 'dob', 'pob', 'date_added', 'date_updated', 't_user'].includes(header)) { // Exclude multiple headers
                            const th = document.createElement('th');
                            th.setAttribute('scope',"col");
                            th.textContent = capitalizeFirstLetter(header); // Capitalize first letter of header
                            headerRow.appendChild(th);
                        }
                    });
                    // Add additional headers for the edit and delete buttons
                    // Function to create a header cell
                    function createHeaderCell(text, className) {
                        const headerCell = document.createElement('th');
                        headerCell.setAttribute('scope', 'col');
                        headerCell.textContent = text;
                        headerCell.classList.add(className);
                        return headerCell;
                    }                    
                    // Create and add the Edit header cell
                    const editHeader = createHeaderCell('Edit', 'editHeader');
                    headerRow.appendChild(editHeader);                  
                    // Create and add the Delete header cell
                    const deleteHeader = createHeaderCell('Delete', 'deleteHeader');
                    headerRow.appendChild(deleteHeader);
                    tableHead.appendChild(headerRow);
                    table.appendChild(tableHead);
                    // Create table rows with data
                    data.forEach(rowData => {
                        const row = document.createElement('tr');

                        headers.forEach(header => {
                            if (!['id', 'slug', 'dob', 'pob', 'date_added', 'date_updated', 't_user'].includes(header)) { // Exclude multiple headers
                                const cell = document.createElement('td');
                                cell.setAttribute('data-label', header);
                                cell.textContent = rowData[header];
                                // Add a class to the td element
                                cell.classList.add('text-center', 'uppercase');
                                row.appendChild(cell);
                            }
                        });
                        
                        // Create dropdown cell for edit and delete buttons
                        const dropdownCell = document.createElement('td');
                        dropdownCell.classList.add('dropdown-cell');

                        const dropdownButton = document.createElement('button');
                        dropdownButton.classList.add('dropdown-button');
                        dropdownButton.setAttribute('id', 'dropdown-button');
                        // create fontawesome icon <i class="fa-regular fa-ellipsis-vertical"></i> and append it to the dropdown button
                        const iconEllipsisVerticalElement = document.createElement('i');
                        iconEllipsisVerticalElement.classList.add('fa','fa-regular', 'fa-ellipsis-vertical');
                        dropdownButton.appendChild(iconEllipsisVerticalElement);

                        // Action when the dropdow button is clicked
                        dropdownButton.addEventListener('click', function(event) {
                            const DropdownContent = document.getElementById('dropdown-content');
                            if (dropdownContent.style.display === 'flex') {
                                dropdownContent.style.display = 'none';
                              } else {
                                dropdownContent.style.display = 'flex';
                                
                            }
                            event.stopPropagation();
                        });
                        document.addEventListener('click', function() {
                            const dropdownContents = document.getElementsByClassName('dropdown-content');
                            for (let i = 0; i < dropdownContents.length; i++) {
                              dropdownContents[i].style.display = 'none';
                            }
                          });
                        dropdownCell.appendChild(dropdownButton);

                        // create the dropdown content
                        const dropdownContent = document.createElement('div');
                        dropdownContent.classList.add('dropdown-content', 'nj-flex', 'shadow');
                        dropdownContent.setAttribute('id', 'dropdown-content');

                        // Create the Edit button
                        const editButton = createButton('edit-button', function() {
                            openEditModal(rowData.id);
                        }, 'fa-edit', 'Edit');
                        dropdownContent.appendChild(editButton);
                        
                        // Create the Delete button
                        const deleteButton = createButton('delete-button', function() {
                            deleteTeacher(rowData.id);
                        }, 'fa-trash', 'Delete');
                        dropdownContent.appendChild(deleteButton); 
                        dropdownCell.appendChild(dropdownContent);
                        row.appendChild(dropdownCell);
                        tableBody.appendChild(row);
                    });

                    
                    table.appendChild(tableBody);
                    table.classList.add('table-with-border');
                    tableContainer.appendChild(table);
                    tableContainer.classList.add('table-container');
                    const element = document.getElementById('teacherlist-warper');
                    element.appendChild(tableContainer);
                }, 500
            );
        }
    })
    .catch(function (error) {
        console.error(error);
        // Handle any errors here
    });
}
handleTeacherList()

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
                { label: 'Nom', name: 'nom', value: teacherData.nom, placeholder: ' Nom' },
                { label: 'Prenom', name: 'prenom', value: teacherData.prenom, placeholder: ' Prenom' },
                { label: 'slug', name: 'slug', value: teacherData.slug, placeholder: ' Slug' },
                { label: 'Gender', name: 'gender', value: teacherData.gender, placeholder: ' Gender' },
                { label: 'Birth date', name: 'dob', value: teacherData.dob, placeholder: ' Birth Date' },
                { label: 'Birth place', name: 'pob', value: teacherData.pob, placeholder: ' Birth Place' }
            ];
            const formContainer = document.createElement('form');
            formContainer.id = 'editForm';
            formContainer.className = 'editForm';

            formFields.forEach(field => {
                const formGroupDiv = document.createElement('div');
                formGroupDiv.className = 'form-group nj-formLabelImput';

                const label = document.createElement('label');
                label.setAttribute('for', field.name);
                label.textContent = `${field.label}:`;

                const input = document.createElement('input');
                input.type = 'text';
                input.id = field.name;
                input.name = field.name;
                input.value = field.value;
                input.className = 'form-control';
                input.required = true;

                formGroupDiv.appendChild(label);
                formGroupDiv.appendChild(input);

                formContainer.appendChild(formGroupDiv);
            });

            const submitButton = document.createElement('button');
            submitButton.setAttribute('aria-label', 'Save');
            submitButton.type = 'submit';
            submitButton.className = 'modal-submit-btn';
            submitButton.textContent = 'Save';

            formContainer.appendChild(submitButton);

            // Add event listener to the form
            formContainer.addEventListener('submit', event => handleEditFormSubmit(event, teacherId));

            // Append the form to the modalContainer
            const njcardform = document.getElementById("nj-card-form");
            njcardform.appendChild(formContainer);

            // Set the content of the modal title
            const njcardtitle = document.getElementById("nj-card-title");
            njcardtitle.textContent = teacherData.nom + " " + teacherData.prenom;
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
        { label: 'Nom', name: 'nom', placeholder: ' Nom' },
        { label: 'Prenom', name: 'prenom', placeholder: ' Prenom' },
        { label: 'Gender', name: 'gender', placeholder: ' Gender' },
        { label: 'Birth date', name: 'dob', placeholder: ' Birth Date' },
        { label: 'Birth place', name: 'pob', placeholder: ' Birth Place' }
    ];
    const formElements = formFields.map(field => {
        return `
          <div class="form-group nj-formLabelImput">
            <label for="${field.name}">${field.label}:</label>
            <input type="text" id="${field.name}" name="${field.name}" placeholder="${field.placeholder}" class="form-control" required>
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



