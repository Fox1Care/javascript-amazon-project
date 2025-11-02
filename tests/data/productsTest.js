import * as products from '../../data/products.js';
describe('Products Data Module', () => {
  const productObject = new products.Product(
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ],
    },
    );

  it('object is instance of Product ', () => {
    expect(productObject instanceof products.Product).toEqual(true);
  });

  it('getPrice() method converts priceCents', () => {
    expect(productObject.getPrice(productObject.priceCents)).toEqual('$10.90');
  });

  it('extraInfoHTML() method doesn\'t provide extra information', () => {
    expect(productObject.extraInfoHTML()).toEqual('');
  });

  it('getStarsURL() method gets correct rating image', () => {
    expect(productObject.getStarsUrl()).toContain('45');
  });

});

describe('Clothing Data Module', () => {
  const clothingObject = new products.Clothing(
    {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
    },
  );

  it('object is instance of Clothing', () => {
    expect(clothingObject instanceof products.Clothing).toEqual(true);
  });

  it('sizeChartLink value is correct', () => {
    expect(clothingObject.sizeChartLink).toEqual('images/clothing-size-chart.png');
  });

  it('extraInfoHTML() returns <a> tag with sizeChartLink as ref', () => {
    expect(clothingObject.extraInfoHTML()).toContain(`<a href="images/clothing-size-chart.png" target="_blank">`);
  });

});

describe('Appliance Data Module', () => {
  const applianceObject = new products.Appliance(
      {
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: "appliances",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
    },
  )

  it('object is instance of appliance', () => {
    expect(applianceObject instanceof products.Appliance).toEqual(true);
  })

  it('instructionsLink value is correct', () => {
    expect(applianceObject.instructionsLink).toEqual('images/appliance-instructions.png');
  });

  it('warrantyLink value is correct', () => {
    expect(applianceObject.warrantyLink).toEqual('images/appliance-warranty.png');
  });

  it('extraInfoHTML() returns double <a> tags with instructionsLink and warrantyLink as refs', () => {
    expect(applianceObject.extraInfoHTML()).toContain('<a href="images/appliance-instructions.png" target="_blank">');
    expect(applianceObject.extraInfoHTML()).toContain('<a href="images/appliance-warranty.png" target="_blank">');
  });
});
