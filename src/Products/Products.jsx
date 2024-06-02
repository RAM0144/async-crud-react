import { useState, useEffect } from "react";
import styles from "./Products.module.css";
import Product from "../Product/Product";
import { getAllProducts, getProduct, createProduct, deleteProducts, updateProduct } from "../apis.axiios";

const initialFormState = {
    title: "",
    image: "",
    price: "",
    qty: "",
}

const Products = () => {

    const [prods, setProds] = useState([]);

    const [formOpen, setFormOpen] = useState(false);

    const [formState, setFormState] = useState(initialFormState);

    const [editId, setEditId] = useState(null);


    // form open and close + ,X
    const handleForm = () => {
        if (formOpen) {
            setFormOpen(false);
        } else {
            setFormOpen(true);
        }
    };

    const loadEditProd = async (ProductsId) => {
        setEditId(ProductsId);
        const product = await getProduct(ProductsId);
        setFormState(product)
        handleForm()

    };

    const loadProds = async () => {

        const data = await getAllProducts();

        setProds(data);
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Create a new product
    const createNewProduct = async () => {
        const newProd = await createProduct(formState);
        setProds([...prods, newProd]);

    }

    const editProduct = async () => {
        const newProduct = await updateProduct(formState, editId);

        const index = prods.findIndex((pd) => pd.id === editId);
        const tempProds = [...prods];
        tempProds[index] = newProduct;
        setProds(tempProds);
        setEditId(null);
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            editProduct();
        } else {
            createNewProduct();
        }
        handleForm();
        setFormState(initialFormState)

    };

    // Deleting a single product
    const removeProduct = async (ProductsId) => {
        await deleteProducts(ProductsId);

        setProds(prods.filter((pd) => pd.id !== ProductsId));
    };

    useEffect(() => {
        loadProds();
    }, [])

    return (

            <div className={styles.container}>
                <button className={styles["add-btn"]} onClick={handleForm} >Click:  + </button>
                {prods.map((pd) => (
                    <Product {...pd} key={pd.id} removeProduct={removeProduct} loadEditProd={loadEditProd} />
                ))}
                {formOpen &&
                    <div className={styles.overlay}>
                        <button onClick={handleForm} className={styles["add-btn"]}>click: X</button>
                        <form onSubmit={handleSubmit}>
                            <input placeholder="Title" type="text" name="title" required
                                value={formState.title} onChange={handleFormChange} />

                            <input placeholder="Price" type="text" name="price" required
                                value={formState.price} onChange={handleFormChange} />

                            <input placeholder="Quantity" type="number" name="qty" required
                                value={formState.qty} onChange={handleFormChange} />

                            <input placeholder="Image URL" type="url" name="image" required
                                value={formState.image} onChange={handleFormChange} />

                            <button type="submit">Submit</button>

                        </form>
                    </div>
                }
            </div>
        
    )
};

export default Products;