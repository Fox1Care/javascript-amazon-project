import { products, getProduct } from '../../data/products.js';

describe('test suite: getProduct', () => {
  const productId = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

  it('gets required product', () => {
    expect(getProduct(productId)).toEqual(products[2]);
  });

  it('doesn\'t get product if non-existent ID given', () => {
    expect(getProduct('123')).toEqual();
  });

})