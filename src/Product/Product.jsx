import PropTypes from "prop-types"
import styles from "./Product.module.css"

const Product = ({ title, qty, image, price, id, removeProduct, loadEditProd }) => {
    return (
        <div className={styles.container}>
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <h3>Price: {price}</h3>
            <h4>Qty: {qty}</h4>
            <button onClick={() => removeProduct(id)}>Delete</button>{" "}
            <button onClick={() => loadEditProd(id)}>Edit</button>
        </div>
    )
};
Product.propTypes = {
    title: PropTypes.string,
    qty: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    image: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    removeProduct: PropTypes.func,
    loadEditProd: PropTypes.func,
}
export default Product;