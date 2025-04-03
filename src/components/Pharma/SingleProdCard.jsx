import { Capsule } from "react-bootstrap-icons";

const SingleProdCard = ({ product }) => {
  return (
    <div className="card h-100 shadow-sm">
    <div className="position-relative">
      <img 
      src={
        product.image 
          ? `http://localhost:5250/${product.image.replace(/\\/g, '/')}`
          : "https://img.freepik.com/premium-vector/cat-box-page-file-found-connection-error-flat-outline-vector-white_705714-496.jpg"
      } 
       className="card-img-top" 
        alt={product.name} 
        style={{ height: "200px", objectFit: "cover" }}
      />
      {product.isMed && (
        <div className="position-absolute top-0 start-0 bg-info text-white p-2">
         <Capsule/>
        </div>
      )}
    </div>
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{product.name}</h5>
      <div className="mb-2">
        {product.drawer?.Position && (
          <span className="badge bg-light text-dark me-1">
            <i className="fas fa-map-marker-alt me-1"></i>
            {product.Drawer.position}
          </span>
        )}
        {product.company?.name && (
          <span className="badge bg-light text-dark">
            <i className="fas fa-building me-1"></i>
            {product.company.name}
          </span>
        )}
      </div>
      <div className="mb-2">
        <span className="badge bg-primary">
          {product.categoryName}
        </span>
      </div>
      <div className="mt-auto">
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-5 text-primary">
            €{product.price.toFixed(2)}
          </span>
          <button className="btn btn-sm btn-outline-primary">
            <i className="fas fa-shopping-cart me-1"></i>
            Acquista
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SingleProdCard;
