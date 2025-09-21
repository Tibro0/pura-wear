import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "../../common/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const Edit = ({ placeholder }) => {
  // Page Title
  useEffect(() => {
    document.title = "Pura Wear | Edit Product";
  }, []);

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  // const [gallery, setGallery] = useState([]);
  const [productImages, setProductImages] = useState([]);
  // const [galleryImages, setGalleryImages] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(`${apiUrl}/products/${params.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setProductImages(result.data.product_images);
          reset({
            title: result.data.title,
            category: result.data.category_id,
            brand: result.data.brand_id,
            sku: result.data.sku,
            qty: result.data.qty,
            short_description: result.data.short_description,
            description: result.data.description,
            price: result.data.price,
            compare_price: result.data.compare_price,
            barcode: result.data.barcode,
            status: result.data.status,
            is_featured: result.data.is_featured,
          });
          // console.log(result);
          // setBrands(result.data);
        });
    },
  });

  const saveProduct = async (data) => {
    const fromData = { ...data, description: content, gallery: gallery };
    setDisable(true);
    const res = await fetch(`${apiUrl}/products`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(fromData),
    })
      .then((res) => res.json())
      .then((result) => {
        setDisable(false);
        if (result.status == 200) {
          toast.success(result.message);
          navigate("/admin/products");
        } else {
          const formErrors = result.errors;
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] });
          });
        }
      });
  };

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.data);
      });
  };

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setBrands(result.data);
      });
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    formData.append("product_id", params.id); // chat GPT
    setDisable(true);

    const res = await fetch(`${apiUrl}/save-product-image`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          productImages.push(result.data);
          setProductImages(productImages);
        } else {
          toast.error(result.errors.image[0]);
        }
        setDisable(false);
        e.target.value = "";
      });
  };

  const changeImage = async (image) => {
    const res = await fetch(`${apiUrl}/change-product-default-image?product_id=${params.id}&image=${image}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          toast.success(result.message);
        } else {
          console.log("Something Went Wrong");
        }
        // setBrands(result.data);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Products / Edit</h4>
            <Link to="/admin/products" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Title
                    </label>
                    <input
                      {...register("title", {
                        required: "The Title Filed is Required.",
                      })}
                      type="text"
                      className={`form-control ${errors.title && "is-invalid"}`}
                      placeholder="Title"
                    />
                    {errors.title && (
                      <p className="invalid-feedback">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Category
                        </label>
                        <select
                          {...register("category", {
                            required: "Please Select a Category.",
                          })}
                          className={`form-select ${
                            errors.title && "is-invalid"
                          }`}
                        >
                          <option value="">Select a Category</option>
                          {categories &&
                            categories.map((category) => {
                              return (
                                <option
                                  key={`category-${category.id}`}
                                  value={category.id}
                                >
                                  {category.name}
                                </option>
                              );
                            })}
                        </select>
                        {errors.category && (
                          <p className="invalid-feedback">
                            {errors.category.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Brand
                        </label>
                        <select {...register("brand")} className="form-select">
                          <option value="">Select a Brand</option>
                          {brands &&
                            brands.map((brand) => {
                              return (
                                <option
                                  key={`brand-${brand.id}`}
                                  value={brand.id}
                                >
                                  {brand.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>
                    <textarea
                      {...register("short_description")}
                      className="form-control"
                      placeholder="Short Description"
                      rows={4}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Description
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                    />
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Pricing</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Price
                        </label>
                        <input
                          {...register("price", {
                            required: "The Price Filed is Required.",
                          })}
                          className={`form-control ${
                            errors.price && "is-invalid"
                          }`}
                          type="text"
                          placeholder="Price"
                        />
                        {errors.price && (
                          <p className="invalid-feedback">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Discounted Price
                        </label>
                        <input
                          {...register("compare_price")}
                          type="text"
                          className="form-control"
                          placeholder="Discounted Price"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Inventory</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          SKU
                        </label>
                        <input
                          {...register("sku", {
                            required: "The SKU Filed is Required.",
                          })}
                          className={`form-control ${
                            errors.sku && "is-invalid"
                          }`}
                          type="text"
                          placeholder="SKU"
                        />
                        {errors.sku && (
                          <p className="invalid-feedback">
                            {errors.sku.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Barcode
                        </label>
                        <input
                          {...register("barcode")}
                          type="text"
                          className="form-control"
                          placeholder="Barcode"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Qty
                        </label>
                        <input
                          {...register("qty")}
                          type="text"
                          className="form-control"
                          placeholder="Qty"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Status
                        </label>
                        <select
                          {...register("status", {
                            required: "Please Select a Status.",
                          })}
                          className={`form-select ${
                            errors.status && "is-invalid"
                          }`}
                        >
                          <option value="">Select a Status</option>
                          <option value="1">Active</option>
                          <option value="0">Block</option>
                        </select>
                        {errors.status && (
                          <p className="invalid-feedback">
                            {errors.status.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Featured
                    </label>
                    <select
                      {...register("is_featured", {
                        required: "Please Select a Featured.",
                      })}
                      className={`form-select ${
                        errors.is_featured && "is-invalid"
                      }`}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {errors.is_featured && (
                      <p className="invalid-feedback">
                        {errors.is_featured.message}
                      </p>
                    )}
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Gallery</h3>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Image
                    </label>
                    <input
                      onChange={handleFile}
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      {productImages &&
                        productImages.map((productImage, index) => {
                          return (
                            <div className="col-md-3" key={`image-${index}`}>
                              <div className="card shadow">
                                <img
                                  src={productImage.image_url}
                                  className="w-100"
                                />
                              </div>
                              <button
                                className="btn btn-danger mt-3 w-100"
                                onClick={() => deleteImage(image)}
                              >
                                Delete
                              </button>

                              <button
                                className="btn btn-secondary mt-3 w-100"
                                onClick={() => changeImage(productImage.image)}
                              >
                                Set as Default
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3 mb-5"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
