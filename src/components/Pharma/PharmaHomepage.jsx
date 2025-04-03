/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import { useDispatch } from "react-redux";
import { getData } from "../../redux/actions/ProductsApi";

const PharmaHomepage = () => {
  const [cat, setCat] = useState([]);
  const [prod, setProd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
            <button key={category.id} className="btn btn-success">
              {category.name}
            </button>
          ))}
      </div>
      <section>
        {console.log(prod)}
        <h2 className="h4 mb-3">Tutti i prodotti</h2>
        {prod.length > 0 && prod ? (
          <AllProducts products={prod} />
        ) : (
          <div className="alert alert-info">
            Nessun prodotto disponibile al momento
          </div>
        )}
      </section>
    </div>
  );
};

export default PharmaHomepage;
