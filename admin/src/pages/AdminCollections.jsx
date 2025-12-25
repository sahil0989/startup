import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = `${process.env.REACT_APP_API_URL}/api/collections`;

export default function AdminCollections() {

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef(null);

  /* ================= FETCH COLLECTIONS ================= */
  const fetchCollections = async () => {
    try {
      const res = await axios.get(API, { withCredentials: true });
      setCollections(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", image: null });
    setEditingId(null);
    setPreview(null);
    setCurrentImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent double click

    setIsSubmitting(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

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
      fetchCollections();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSubmitting(false); // 🔥 always stop loader
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (collection) => {
    setEditingId(collection._id);
    setFormData({
      name: collection.name,
      description: collection.description || "",
      image: null,
    });

    setCurrentImage(collection.image || null);
    setPreview(null);
    setIsModalOpen(true);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this collection?"))
      return;

    try {
      setDeletingId(id); // 🔥 start animation

      await axios.delete(`${API}/${id}`, { withCredentials: true });

      // Optional: smooth UI without full refetch
      setCollections((prev) => prev.filter((c) => c._id !== id));

    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null); // 🔥 stop animation
    }
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading collections...
      </div>
    );
  }

  console.log("Collections ", collections)

  return (
    <>
      <Navbar />

      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Collections</h1>
            <p className="text-gray-500 text-sm">
              Create, edit and manage product collections
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
          >
            + Add Collection
          </button>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative">

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
                {editingId ? "Edit Collection" : "Add New Collection"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Collection Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      {editingId ? "Replace Image (optional)" : "Collection Image"}
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-600">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  {currentImage && !preview && (
                    <img
                      src={currentImage}
                      className="w-28 h-28 object-cover rounded-xl border"
                      alt="img"
                    />
                  )}

                  {preview && (
                    <img
                      src={preview}
                      className="w-28 h-28 object-cover rounded-xl border"
                      alt="img"
                    />
                  )}
                </div>

                <div className="flex justify-end gap-3">
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
                    className="bg-black text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting && (
                      <svg
                        className="w-4 h-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V4a8 8 0 00-8 8z"
                        />
                      </svg>
                    )}

                    {editingId
                      ? isSubmitting ? "Updating..." : "Update"
                      : isSubmitting ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* COLLECTION LIST - TABLE VIEW */}
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Description</th>
                <th className="text-left px-4 py-3">Products</th>
                <th className="text-left px-4 py-3">Image</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {collections.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No collections found
                  </td>
                </tr>
              )}

              {collections.map((col, index) => (
                <tr
                  key={col._id}
                  className={`border-t transition
                ${deletingId === col._id
                      ? "opacity-50 animate-pulse"
                      : "hover:bg-gray-50"
                    } `}
                >
                  <td className="px-4 py-3">{index + 1}</td>

                  {/* NAME */}
                  <td className="px-4 py-3 font-medium" >
                    {col.name}
                  </td>

                  {/* DESCRIPTION */}
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                    {col.description || "—"}
                  </td>

                  {/* PRODUCT COUNT */}
                  <td className="px-4 py-3">
                    {col?.products?.length ?? 0}
                  </td>

                  {/* IMAGE */}
                  <td className="px-4 py-3">
                    {col.image ? (
                      <img
                        src={col.image}
                        alt={col.name}
                        onClick={() => setPreviewImage(col.image)}
                        className="w-14 h-14 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 rounded-lg" />
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(col)}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100 h-8"
                      >
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(col._id)}
                        disabled={deletingId === col._id}
                        className={`h-8 px-3 py-1 border rounded-lg flex items-center justify-center gap-2
        ${deletingId === col._id
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-600 hover:bg-red-50"
                          }
      `}
                      >
                        {deletingId === col._id ? (
                          <>
                            <svg
                              className="w-4 h-4 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V4a8 8 0 00-8 8z"
                              />
                            </svg>
                            <span>Deleting...</span>
                          </>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div >

      </div >

      {/* IMAGE PREVIEW MODAL */}
      {
        previewImage && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setPreviewImage(null)}
          >
            <div
              className="relative bg-white p-4 rounded-xl max-w-3xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-3 -right-3 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-800"
              >
                ✕
              </button>

              <img
                src={previewImage}
                alt="Preview"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </div>
        )
      }

    </>
  );
}
