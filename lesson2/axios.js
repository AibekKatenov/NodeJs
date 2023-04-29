let axios = require('axios')

axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
            response.data.slice(0, 10).forEach(element => {
                console.log(element.id + ': '+ element.title)
            });
        })