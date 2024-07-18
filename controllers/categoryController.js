import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import dotenv from 'dotenv';

dotenv.config();

// Function to get the file path dynamically
const getFilePath = (fileName) => {
  return path.join(process.cwd(), 'Data', `${fileName}.json`); 
};

// Function to read JSON file
const readJSONFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Function to write to JSON file
const writeJSONFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Create category
// export const createCategoryController = async (req, res) => {
//   try {
//     const { name } = req.body;
//     if (!name) {
//       return res.status(400).send({ message: "Name is required" });
//     }

//     const categoriesFilePath = getFilePath('categories');
//     const categories = readJSONFile(categoriesFilePath);

//     const existingCategory = categories.find(cat => cat.name === name);
//     if (existingCategory) {
//       return res.status(400).send({
//         success: false,
//         message: "Category Already Exists",
//       });
//     }

//     const newCategory = {
//       id: categories.length + 1,
//       name,
//       slug: slugify(name),
//     };

//     categories.push(newCategory);
//     writeJSONFile(categoriesFilePath, categories);

//     res.status(201).send({
//       success: true,
//       message: "New category created",
//       category: newCategory,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in Category creation",
//     });
//   }
// };

// Update category
// export const updateCategoryController = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const { id } = req.params;

//     const categoriesFilePath = getFilePath('categories');
//     let categories = readJSONFile(categoriesFilePath);

//     const categoryToUpdate = categories.find(cat => cat.id === parseInt(id));
//     if (!categoryToUpdate) {
//       return res.status(404).send({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     categoryToUpdate.name = name;
//     categoryToUpdate.slug = slugify(name);

//     writeJSONFile(categoriesFilePath, categories);

//     res.status(200).send({
//       success: true,
//       message: "Category updated successfully",
//       category: categoryToUpdate,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error while updating category",
//     });
//   }
// };

// Get all categories
export const categoryController = async (req, res) => {
  try {
    const categoriesFilePath = getFilePath('categories');
    const categories = readJSONFile(categoriesFilePath);

    res.status(200).send({
      success: true,
      message: "All Categories list",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// Get single category
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    const categoriesFilePath = getFilePath('categories');
    const categories = readJSONFile(categoriesFilePath);

    const category = categories.find(cat => cat.slug === slug);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

// Delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const categoriesFilePath = getFilePath('categories');
    let categories = readJSONFile(categoriesFilePath);

    const updatedCategories = categories.filter(cat => cat.id !== parseInt(id));

    writeJSONFile(categoriesFilePath, updatedCategories);

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting category",
    });
  }
};
