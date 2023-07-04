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

function openEditModal(teacherId) {
    const njmodal = document.getElementById("nj-modal");
    const njoverlay = document.getElementById("overlay");
    njmodal.classList.remove("hidden");
    njoverlay.classList.remove("hidden");
}


function closeEditeModal() {
    const njmodal = document.getElementById("nj-modal");
    const njoverlay = document.getElementById("overlay");
    njmodal.classList.add("hidden");
    njoverlay.classList.add("hidden");
}