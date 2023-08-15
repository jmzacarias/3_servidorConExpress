import fs from "fs"
import __dirname from './utils.js';

class ProductManager {
   #path
    constructor() {
        this.#path = (__dirname+'/files/products.json')
    }
    
    getProducts = async()=>{
        if (!fs.existsSync(this.#path)) return [];
        const fileData = await fs.promises.readFile(this.#path, 'utf-8')
        const products = JSON.parse(fileData)
        return products
    }

    addProduct = async(product) => {
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) return 'ERR. Missing Fields';
        const products = await this.getProducts();
        let validateCode = products.find(item => item.code === product.code);
        if(validateCode) return 'ERR Code already exists';
        if(products.length === 0) {
            product.id=1
        }else{
            product.id= products[products.length-1].id+1;
        }
        products.push(product)
        await fs.promises.writeFile(this.#path,JSON.stringify(products,null,'\t'))
        return product
    }

    getProductById = async(id)=> {
        const products = await this.getProducts()
        const productById = products.find(item => item.id === id)
        if(!productById) return `ERR: ID product doesn´t exists`
        return productById
    }
    updateProduct = async(id, productToUpdate)=>{
        const products = await this.getProducts()
        const productById = products.find(item => item.id === id)
        if(!productById) return `ERR There's no product with ID:${id}`;
        let updatedProducts = products.map(item => {
            if(item.id===id) return {...item,...productToUpdate}
        })
        let updatedProduct = updatedProducts.find(item => item.id===id);
        await fs.promises.writeFile(this.#path,JSON.stringify(updatedProducts,null,'\t'))
        return updatedProduct
    }

    deleteById = async(id)=>{
        const products = await this.getProducts()
        const productById = products.find(item => item.id === id)
        if(!productById) return `ERR There's no product with ID: ${id}`
        let updatedProducts = []
        products.forEach(item => {
            if(item.id!==id) {
                updatedProducts.push(item)
            } 
        });
        await fs.promises.writeFile(this.#path,JSON.stringify(updatedProducts,null,'\t'))
        return updatedProducts
    }
}
export default ProductManager;


