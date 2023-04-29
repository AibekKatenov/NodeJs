function deleteItem(id){
    axios.delete(`/delete/${id}`).then(() => location.reload())
 }     
 