import { Container, Select } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../components/ProductList";
import { getCategories } from "../redux/actions/categoryActions";
import { getOffers } from "../redux/actions/filtersActions";

const Offers = () => {
  
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const products = useSelector((state) => state.productsReducer.products);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getOffers('off:off'));
  }, []);

  const getOffersForCat = (event) => {
    localStorage.setItem('page', '1')
    if (event.target.value == 'all')
      dispatch(getOffers(`off:off`));
    else 
      dispatch(getOffers(`cat:${event.target.value}::off:off`));
  }

  return (
    <>
      <Container>
        <span style={{marginLeft:'20px', fontsize:'30px'}}>Categories{' '}</span>
        <Select onChange={getOffersForCat}>
          <option default value={'all'}>
            All
          </option>
          {categories &&
            categories.map((cat) => <option value={cat}>{cat}</option>)}
        </Select>
      </Container>

      <ProductList />
    </>
  );
}

export default Offers;