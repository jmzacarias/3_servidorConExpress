import express from "express";
import ProductManager from "./productManager.js";


const app = express();
const productManager = new ProductManager();
app.listen(8080, ()=> console.log('Server connected'))

app.get('/products',async (req,res)=>{
    const data = await productManager.getProducts()
    const limit = req.query.limit
    if(!limit) return res.send({payload:data})
    let limitedData = data.slice(0, limit)
    return res.send({payload: limitedData})     
})

app.get('/products/:pid',async (req,res)=>{
    let param = req.params.pid
    if(isNaN(param)) return res.send({error: `"${param}" is not a number`})
    const pid = parseInt(param)
    const data = await productManager.getProductById(pid)
    return res.send({payload:data})
})