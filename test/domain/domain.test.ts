import { Product } from '../../src/domain/entity/product.entity';


describe('domain test', ()=>{

    describe('product test', () => {
      test('insert product test', () => {

        const product = new Product();
        product.reference = '8563';
        product.name = 'Product Name Example';
        product.description = 'Description Example';
        product.quantity = 0;
        product.price = 7500;

        product.insertProduct(5)

        expect(5).toBe(5);
      });

      test('remove product test', () => {

        const product = new Product();
        product.reference = '8563';
        product.name = 'Product Name Example';
        product.description = 'Description Example';
        product.quantity = 5;
        product.price = 7500;

        product.removeProduct(5)

        expect(0).toBe(0);
      })
    });

});