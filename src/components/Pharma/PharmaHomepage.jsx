/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import { useDispatch } from "react-redux";
import { getData } from "../../redux/actions/ProductsApi";

const PharmaHomepage = () => {
  const [cat, setCat] = useState([]);
  const [prod, setProd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProd, setFilteredProd] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  const GetDatas = async () => {
    setIsLoading(true);
    //QUESTO SERVE PER ATTENDERE TUTTE LE PROMISE
    try {
      const [category, prod] = await Promise.all([
        dispatch(getData("category")),
        dispatch(getData()),
      ]);
      setCat(category.categories);
      setProd(prod.products);
    } catch (error) {
      console.log(error, "errore fetch");
    } finally {
      setIsLoading(false);
    }
  };


  const filterByCategory = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setFilteredProd(prod);
    } else {
      setSelectedCategory(categoryId);
      {console.log(selectedCategory , categoryId)}
      const filtered = prod.filter((item) => item.categoryName === categoryId);
      setFilteredProd(filtered);
    }
  };

  useEffect(() => {
    GetDatas();
  }, []);

  if (isLoading) {
    return <p message="Caricamento prodotti..." />;
  }
  return (
    <div className="container">
      <h1>Farmacia</h1>

      <div className="d-flex gap-2 flex-wrap my-4">
        {cat &&
          cat.map((category) => (
            <button 
              key={category.id} 
              className={`btn ${selectedCategory === category.name ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => filterByCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
      </div>
      <section>
        <h2 className="h4 mb-3">
          {selectedCategory 
            ? `Prodotti della categoria: ${cat.find(c => c.id === selectedCategory)?.name}`
            : 'Tutti i prodotti'}
        </h2>
        {filteredProd.length > 0 ? (
          <AllProducts products={filteredProd} />
        ) : (
          <div className="alert alert-info">
            Nessun prodotto disponibile {selectedCategory ? 'in questa categoria' : 'al momento'}
          </div>
        )}
      </section>
    </div>
  );
};

export default PharmaHomepage;
