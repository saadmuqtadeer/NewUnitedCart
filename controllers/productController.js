import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import path from 'path';  
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//payment gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// const getFilePath = (fileName) => path.join(__dirname, 'Data', fileName);
const getFilePath = (fileName) => {
  return path.join(process.cwd(), 'Data', fileName); 
};

const readJSONFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

//as data is created/updated statically we dont need to create it
// export const createProductController = async (req, res) => {
//   try {
//     const { name, description, price, category, quantity, shipping, photo } =
//       req.fields;

//     // Validation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
//       case !description:
//         return res.status(500).send({ error: "Description is Required" });
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case !quantity:
//         return res.status(500).send({ error: "Quantity is Required" });
//       case !photo:
//         return res.status(500).send({ error: "Photo is Required" });
//     }

//     // Create the product
//     const products = new productModel({
//       ...req.fields,
//       slug: slugify(name),
//       images:
//         req.fields.images instanceof Array
//           ? req.fields.images
//           : [req.fields.images],
//     });

//     // if (req.files && req.files.photo) {
//     //   const { photo } = req.files;
//     //   if (photo.size > 5000000) {
//     //     return res.status(500).send({ error: "Photo should be less than 5MB" });
//     //   }
//     //   products.photo = {
//     //     data: fs.readFileSync(photo.path),
//     //     contentType: photo.type,
//     //   };
//     // }

//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Created Successfully",
//       products,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in creating product",
//     });
//   }
// };

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = readJSONFile(getFilePath('products.json'));
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "AllProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const products = readJSONFile(getFilePath('products.json'));
    const product = products.find(p => p.slug === req.params.slug);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
// not needed as product photos are stored inside json
export const productPhotoController = async (req, res) => {
  try {
    const { id } = req.params;
    const productsFilePath = getFilePath('products');
    const products = readJSONFile(productsFilePath);

    const product = products.find(prod => prod._id === id); // Assuming 'id' is a string in your JSON

    if (!product || !product.photo) {
      return res.status(404).send({
        success: false,
        message: "Product photo not found",
      });
    }

    const photoFilePath = path.join(process.cwd(), 'Data', 'Photos', product.photo);
    res.sendFile(photoFilePath);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching product photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    const productsFilePath = getFilePath('products.json');
    let products = readJSONFile(productsFilePath);

    // Find the index of the product to delete
    const indexToDelete = products.findIndex(p => p.id === req.params.pid);

    if (indexToDelete === -1) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Remove the product from the array
    products.splice(indexToDelete, 1);

    // Save updated products array to the JSON file
    writeJSONFile(productsFilePath, products);

    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
// export const updateProductController = async (req, res) => {
//   try {
//     const { name, description, price, category, quantity, shipping, photo } =
//       req.fields;
//     //alidation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
//       case !description:
//         return res.status(500).send({ error: "Description is Required" });
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case !quantity:
//         return res.status(500).send({ error: "Quantity is Required" });
//       case !photo:
//         return res.status(500).send({ error: "Photo is Required" });
//     }

//     const products = await productModel.findByIdAndUpdate(
//       req.params.pid,
//       { ...req.fields, slug: slugify(name) },
//       { new: true }
//     );
//     // if (photo) {
//     //   products.photo.data = fs.readFileSync(photo.path);
//     //   products.photo.contentType = photo.type;
//     // }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Updated Successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in Updte product",
//     });
//   }
// };

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const productsFilePath = getFilePath('products.json');
    const products = readJSONFile(productsFilePath);

    // Filter products based on criteria
    let filteredProducts = [...products];

    if (checked.length > 0) {
      filteredProducts = filteredProducts.filter(product => checked.includes(product.category));
    }

    if (radio && radio.length === 2) {
      const [minPrice, maxPrice] = radio;
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    res.status(200).send({
      success: true,
      products: filteredProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const productsFilePath = getFilePath('products.json');
    const products = readJSONFile(productsFilePath);
    const total = products.length;
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const productsFilePath = getFilePath('products.json');
    const products = readJSONFile(productsFilePath);

    const perPage = 10;
    const page = req.params.page ? parseInt(req.params.page) : 1;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const paginatedProducts = products.slice(startIndex, endIndex);
    res.status(200).send({
      success: true,
      products: paginatedProducts,
      currentPage: page,
      totalPages: Math.ceil(products.length / perPage)
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const productsFilePath = getFilePath('products.json');
    const products = readJSONFile(productsFilePath);

    const results = products.filter(product =>
      product.name.toLowerCase().includes(keyword.toLowerCase()) ||
      product.description.toLowerCase().includes(keyword.toLowerCase())
    );
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const productsFilePath = getFilePath('products.json');
    const products = readJSONFile(productsFilePath);

    const relatedProducts = products.filter(product =>
      product.category === cid && product._id !== pid
    ).slice(0, 3);
    res.status(200).send({
      success: true,
      products: relatedProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const categoriesFilePath = getFilePath('categories.json');
    const productsFilePath = getFilePath('products.json');
    const categories = readJSONFile(categoriesFilePath);
    const products = readJSONFile(productsFilePath);

    const category = categories.find(cat => cat.slug === slug);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    const categoryProducts = products.filter(product => product.category === category._id);

    res.status(200).send({
      success: true,
      category,
      products: categoryProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting products",
    });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
