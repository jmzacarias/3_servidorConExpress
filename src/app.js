import express from "express";
import ProductManager from "./productManager.js";

const app = express()

app.listen(8080, ()=> console.log('Server connected'))

const productManager = new ProductManager()

app.get('/products',async (req,res)=>{
    const data = await productManager.getProducts()
    const limit = req.query.limit
    if(!limit) res.json({payload:data})
    res.json({payload: data.slice(limit)})
})

app.get('/products/:pid',async (req,res)=>{
    const pid = parseInt(req.params.pid)
    const data = await productManager.getProductById(req.params.pid)
    res.json({payload:data})
})

productManager.addProduct({title: 'papa', description: 'verdura', price: 23, thumbnail: 'Sin imagen', code: 'ABC123', stock:93})