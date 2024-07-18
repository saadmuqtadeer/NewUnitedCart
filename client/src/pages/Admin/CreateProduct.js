import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [images, setImages] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    try {
      const links = [];
      for (let i = 0; i < images.length; i++) {
        const data = await uploadCloudinary(images[i]);
        links.push(data.url);
      }
      setImageLinks(links);
      setImageLoading(false);
    } catch (error) {
      setImageLoading(false);
      console.log(error);
      toast.error("Failed to upload images");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      if (photo) {
        productData.append("photo", photo);
      }
      imageLinks.forEach((link) => productData.append("images[]", link));

      const { data } = await axios.post("/api/v1/product/create-product", productData);
      setLoading(false);
      if (data?.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong in creating the product");
    }
  };

  const uploadCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unitedcart");
    formData.append("cloud_name", "dw8ompaxx");

    const response = await fetch("https://api.cloudinary.com/v1_1/dw8ompaxx/image/upload", {
      method: "post",
      body: formData,
    });

    const data = await response.json();
    return { public_id: data.public_id, url: data.secure_url };
  };

  return (
    <Layout title={"Create Products - Ecommerce"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a Category"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                size="large"
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      height={"200px"}
                      alt="product-img"
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  placeholder="Enter Product Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <textarea
                  placeholder="Enter Product Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="form-control"
                  rows="4"
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Enter Product Price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="form-control"
                  type="number"
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Enter Product Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  className="form-control"
                  type="number"
                />
              </div>
              <form onSubmit={handleImageUpload}>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                />
                <button disabled={imageLoading} type="submit">
                  {imageLoading ? "Loading" : "Upload Images"}
                </button>
              </form>
              <div className="mb-3">
                <Select
                  size="large"
                  placeholder="Select Shipping"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                  bordered={false}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button disabled={loading} className="btn btn-primary" onClick={handleCreate}>
                {loading ? "Loading" : "CREATE PRODUCT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
