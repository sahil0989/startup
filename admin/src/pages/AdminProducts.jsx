import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const API = `${process.env.REACT_APP_API_URL}/api/products`;
const COLLECTION_API = `${process.env.REACT_APP_API_URL}/api/collections`;

export default function AdminProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    collection: "",
    originalPrice: "",
    discountedPrice: "",
    dimensions: "",
    material: "",
    description: "",
    status: "draft",
  });

  // Filters & sorting
  const [search, setSearch] = useState("");
  const [filterCollection, setFilterCollection] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  /* ================= FETCH ================= */
  const fetchProducts = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/all`);
    setProducts(res.data.products);
    setAllProducts(res.data.products);
    setLoading(false);
  };

  const fetchCollections = async () => {
    const res = await axios.get(COLLECTION_API);
    setCollections(res.data);
  };

  useEffect(() => {
    fetchCollections();
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    // 🔍 Search by name
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📂 Filter by collection
    if (filterCollection) {
      filtered = filtered.filter(
        (p) => p.collection?._id === filterCollection
      );
    }

    // 🚦 Filter by status
    if (filterStatus) {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    // 🔃 Sorting
    filtered.sort((a, b) => {
      let valA, valB;

      if (sortBy === "name") {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (sortBy === "price") {
        valA = a.discountedPrice || a.originalPrice;
        valB = b.discountedPrice || b.originalPrice;
      } else {
        // createdAt
        valA = new Date(a.createdAt);
        valB = new Date(b.createdAt);
      }

      if (order === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

    setProducts(filtered);
  }, [
    allProducts,
    search,
    filterCollection,
    filterStatus,
    sortBy,
    order,
  ]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewImages((prev) => [...prev, file]);
    e.target.value = "";
  };

  const handleReplaceNewImage = (index, file) => {
    setNewImages((prev) => {
      const copy = [...prev];
      copy[index] = file;
      return copy;
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      collection: "",
      originalPrice: "",
      discountedPrice: "",
      dimensions: "",
      material: "",
      description: "",
      status: "draft",
    });
    setExistingImages([]);
    setNewImages([]);
    setEditingId(null);
  };

  const handleResetFilters = () => {
    setSearch("");
    setFilterCollection("");
    setFilterStatus("");
    setSortBy("createdAt");
    setOrder("desc");
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    newImages.forEach((img) => data.append("images", img));

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, data, {
          withCredentials: true,
        });
      } else {
        await axios.post(API, data, {
          withCredentials: true,
        });
      }
      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Save failed", err.response?.data || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || "",
      collection: product.collection?._id || "",
      originalPrice: product.originalPrice || "",
      discountedPrice: product.discountedPrice || "",
      dimensions: product.dimensions || "",
      material: product.material || "",
      description: product.description || "",
      status: product.status || "draft",
    });
    setExistingImages(product.images || []);
    setNewImages([]);
    setIsModalOpen(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`${API}/${id}`, { withCredentials: true });
    fetchProducts();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading products...
      </div>
    );
  }

  console.log("Loading ", products);

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-50 min-h-screen space-y-6">
        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Products</h1>
            <p className="text-gray-500 text-sm">Manage products</p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
          >
            + Add Product
          </button>
        </div>

        {/* FILTER & SEARCH */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-3 mb-4 items-center">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg w-48"
          />

          <select
            value={filterCollection}
            onChange={(e) => setFilterCollection(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">All Collections</option>
            {collections.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">All Status</option>
            <option value="live">Live</option>
            <option value="draft">Draft</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="createdAt">Newest</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>

          {/* 🔁 RESET BUTTON */}
          <button
            onClick={handleResetFilters}
            className="ml-auto px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
          >
            Reset
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Dimensions</th>
                <th className="px-4 py-3">Collection</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Images</th>
                <th className="px-4 py-3">Updated At</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, index) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 max-w-64 truncate text-gray-500">
                    {p.description || "-"}
                  </td>
                  <td className="px-4 py-3 truncate text-gray-500">
                    {p?.dimensions || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {p.collection?.name || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {p.discountedPrice ? (
                      <div>
                        <span className="line-through text-gray-400 text-xs mr-1">
                          ₹{p.originalPrice}
                        </span>
                        <span className="font-semibold text-green-600">
                          ₹{p.discountedPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold">₹{p.originalPrice}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${p.status === "live"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="flex flex-wrap gap-2">
                      {p.images?.length > 0 ? (
                        p.images.map((img, i) => (
                          <img
                            key={i}
                            src={img.url}
                            alt={`product-${i}`}
                            onClick={() => setPreviewImage(img.url)}
                            className="w-12 h-12 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                          />
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">No images</span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {formatDate(p.updatedAt)}
                  </td>

                  <td className="px-4 py-3 w-32 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-2 py-1 border rounded-lg hover:bg-gray-100"
                    >
                      <MdEditSquare size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-2 py-1 border rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* IMAGE PREVIEW */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            className="max-w-[90%] max-h-[90%] rounded-xl"
            alt=""
          />
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-6">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border px-3 py-2 rounded-lg w-full"
                />
                <select
                  name="collection"
                  value={formData.collection}
                  onChange={handleChange}
                  required
                  className="border px-3 py-2 rounded-lg w-full"
                >
                  <option value="">Select Collection</option>
                  {collections.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="originalPrice"
                  placeholder="Original Price"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  required
                  className="border px-3 py-2 rounded-lg"
                />
                <input
                  type="number"
                  name="discountedPrice"
                  placeholder="Discounted Price"
                  value={formData.discountedPrice}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="dimensions"
                  placeholder="Dimensions (e.g. 12 x 8 x 4 cm)"
                  value={formData.dimensions}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-lg w-full"
                />

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-lg w-full"
                >
                  <option value="draft">Draft</option>
                  <option value="live">Live</option>
                </select>

              </div>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border px-3 py-2 rounded-lg w-full"
              />

              {/* EXISTING IMAGES */}
              {existingImages.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Current Images</p>
                  <div className="flex gap-3">
                    {existingImages.map((img, i) => (
                      <img
                        key={i}
                        src={img.url}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                        onClick={() => setPreviewImage(img.url)}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* NEW IMAGES */}
              <div>
                <label className="inline-block px-4 py-2 border rounded-lg cursor-pointer">
                  + Upload Image
                  <input type="file" hidden onChange={handleAddImage} />
                </label>
                <div className="flex gap-3 mt-3">
                  {newImages.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20">
                      <img
                        src={URL.createObjectURL(img)}
                        className="w-full h-full object-cover rounded-lg"
                        alt=""
                      />
                      <label className="absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer">
                        Replace
                        <input
                          type="file"
                          hidden
                          onChange={(e) =>
                            handleReplaceNewImage(idx, e.target.files[0])
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-5 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white px-6 py-2 rounded-lg"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingId
                      ? "Update Product"
                      : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
