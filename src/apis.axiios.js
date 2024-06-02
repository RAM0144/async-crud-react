import axios from "axios";

const baseUrl = "https://661765e0ed6b8fa434828e38.mockapi.io/api/v1/Products/";

const prodInstance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar", batch: "Ram" },
});

const getAllProducts = async () => {
    const response = await prodInstance.get("");
    // console.log(response);
    return response.data;
};

const getProduct = async (ProductsId) => {
    return (await prodInstance.get(`${ProductsId}`)).data;
    // const response = await ProdInstance(`${ProductsId}`);
    // return response.data;
};

const deleteProducts = async (ProductsId) => {
    const response = await prodInstance.delete(`${ProductsId}`);
    return response.data;
};

// Create a new Product
const createProduct = async (pdData) => {
    const response = await prodInstance.post("", pdData);

    return response.data;
};

// Update a product
const updateProduct = async (pdData, ProductsId) => {
    return (await prodInstance.put(`${ProductsId}`, pdData)).data;

};

export { getAllProducts, deleteProducts, getProduct, createProduct, updateProduct };