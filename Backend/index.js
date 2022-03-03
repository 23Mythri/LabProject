const port=4000
const app=require('./app.js')

app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}`);
})