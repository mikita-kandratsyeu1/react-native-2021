import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header';
import { nameOfStore } from '../../../constans';
import { Separator } from '../UI';
import { setProducts } from '../../../actions';
import { products } from '../../../mock';
import { getProductsSelector } from '../../../selectors';
import { ProductCategory, ProductList } from './components';
import styles from './MainStyles';

export const Main: React.FC = () => {
  const dispatch = useDispatch();

  const productsData = useSelector(getProductsSelector);

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch]);

  const renderProductCategory = (): React.ReactNode =>
    productsData.length ? (
      productsData.map(category => (
        <ProductCategory key={category.id} productCategory={category} />
      ))
    ) : (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Header title={nameOfStore} isSearchVisible isToggleButtonVisible />
      <View style={styles.productCategoryScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.productCategory}>{renderProductCategory()}</View>
        </ScrollView>
      </View>
      <Separator />
      <View style={styles.productList}>
        {productsData.length ? (
          <ProductList currentCategory={productsData[0]} />
        ) : (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    </View>
  );
};