function deleteBlog(id, authorID){
    const data = axios.delete(`/api/blogs/${id}`).then(data => {
        if(data.status == 200){
            location.replace(`/profile/${authorID}`)
        }else if(data.status == 404){
            console.log('Not found')
        }else{
            console.log('error')
        }
    })
}