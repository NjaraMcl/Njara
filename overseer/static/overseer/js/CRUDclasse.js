function handleClasseList(){
    axios.get('/api/Teacher-List')
    .then(response =>{
        const data = response.data;
        console.error(data);
    })
    .catch(function (error) {
        console.error(error);
        // Handle any errors here
    });
}