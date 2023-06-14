function deleteComment(id){
    axios.delete(`/api/delete/rate/${id}`).then(data => {
        if(data.status == 200){
            location.reload()
        }else if(data.status == 404){
            console.log('Not found')
        }else{
            console.log('error')
        }
    })
}