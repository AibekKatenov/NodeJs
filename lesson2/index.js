// const id = require('./id')
// console.log(id.id1)
// console.log(id.id2)
const http = require('http')

let visits = new Map()

let server = http.createServer((res, resp) => {
    let count = (visits.get(res.url) || 0) + 1
    visits.set(res.url, count)
    resp.end(`Sites opened: ${count}`)
    console.log(res)
})

let PORT = 8000

server.listen(PORT, () => {
    console.log(`Server works in ${PORT} port`);
})