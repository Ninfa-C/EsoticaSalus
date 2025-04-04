import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getData } from "../../redux/actions/ProductsApi";

const ManagePharma = () => {
  const [cat, setCat] = useState([]);
  const [prod, setProd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState();
  const dispatch = useDispatch();

  const GetDatas = async () => {
    setIsLoading(true);
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

  const getFilteredProducts = () => {
    if (!filter) return prod;
    const filterL = filter.toLowerCase();
    return prod.filter((item) =>
      item.categoryName.toLowerCase().includes(filterL)
    );
  };

  return (
    <div>
      <h1>Gestione Farmacia</h1>
      Filtra :
      <Form.Select
        value={cat.categoryId}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>Choose...</option>
        {cat.length > 0 &&
          cat.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
      </Form.Select>
      {isLoading ? (
        <p>Caricamento...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Prezzo</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredProducts().map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.categoryName}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ManagePharma;
