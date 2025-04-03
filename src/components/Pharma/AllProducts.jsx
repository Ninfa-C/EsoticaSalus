import SingleProdCard from "./SingleProdCard";

const AllProduccts = ({ products }) => {
    return ( 
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
      {products.map((product) => (
        <div key={product.id} className="col"> {/* Assumendo che esista una proprietà Id */}
          <SingleProdCard product={product} />
        </div>
      ))}
    </div>
     );
}
 
export default AllProduccts;