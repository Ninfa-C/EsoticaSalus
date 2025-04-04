/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PencilFill, Plus, PlusLg, Trash3 } from "react-bootstrap-icons";
import { DeleteProduct, getData } from "../../redux/actions";

const ManagePharma = () => {
    const [cat, setCat] = useState([]);
    const [prod, setProd] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState();
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useLocation();

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

    const deleteProd = async (id) => {
        if(window.confirm('Sei sicuro di vler eliminare questo prodotto?')){
            await DeleteProduct(id)
            setUpdate(!update);
        }
    }

    useEffect(() => {
        GetDatas();
    }, [update]);
    



    const getFilteredProducts = () => {
        if (!filter) return prod;
        const filterL = filter.toLowerCase();
        return prod.filter((item) => item.categoryName.toLowerCase() === filterL);
    };

    return (
        <div className="container">
            {console.log(state)}
            <h1 className="mb-3">Gestione Farmacia</h1>
            <div className="d-flex justify-content-between">                
                <div className="d-flex gap-3 align-items-center mb-3">
                    <p className="p-0 m-0">Filtra :</p>
                    <Form.Select
                        value={cat.categoryId}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-50"
                    >
                        <option value="">Tutti</option>
                        {cat.length > 0 &&
                            cat.map((item) => (
                                <option value={item.name} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                    </Form.Select>
                </div>
                <div>
                    <Button as= {Link} to="/Products/Add" variant="outline-success" className="align-items-center d-flex gap-2">
                    Aggiungi Prodotto
                    <PlusLg/>
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <p>Caricamento...</p>
            ) : (
                <table className="w-100">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Prezzo</th>
                            <th>Compagnia</th>
                            <th>Nome Cassetto</th>
                            <th>Posizione</th>
                            <th>Gestione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getFilteredProducts().map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.categoryName}</td>
                                <td>€ {product.price.toFixed(2)}</td>
                                <td>{product.company.name}</td>
                                <td>{product.drawer.name}</td>
                                <td>{product.drawer.position}</td>
                                <td className="d-flex gap-3 ms-2"> 
                                    <PencilFill role="button" 
                                        onClick={() => navigate(`/Products/Update/${product.id}`)}
                                        className="text-warning"
                                        style={{ cursor: "pointer" }}/>
                                    <Trash3 role="button"  onClick={() => deleteProd(product.id)} style={{ cursor: "pointer" }} className="text-danger"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default ManagePharma;
