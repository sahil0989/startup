import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ADMIN_API = `${process.env.REACT_APP_API_URL}/api/header-slides/admin`;
const BASE_API = `${process.env.REACT_APP_API_URL}/api/header-slides`;

export default function AdminHeaderSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const fileInputRef = useRef(null);

  /* ================= FETCH ================= */
  const fetchSlides = async () => {
    try {
      const res = await axios.get(ADMIN_API, { withCredentials: true });
      setSlides(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  console.log(slides)

  /* ================= IMAGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setImage(null);
    setPreview(null);
    setCurrentImage(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image && !editingId) return;

    setIsSubmitting(true);

    const data = new FormData();
    if (image) data.append("image", image);

    try {
      if (editingId) {
        await axios.put(`${BASE_API}/${editingId}`, data, {
          withCredentials: true,
        });
      } else {
        await axios.post(BASE_API, data, {
          withCredentials: true,
        });
      }

      setIsModalOpen(false);
      resetForm();
      fetchSlides();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (slide) => {
    setEditingId(slide._id);
    setCurrentImage(slide.image.url);
    setPreview(null);
    setImage(null);
    setIsModalOpen(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this header image?")) return;

    try {
      setDeletingId(id);
      await axios.delete(`${BASE_API}/${id}`, {
        withCredentials: true,
      });
      fetchSlides();
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-50 min-h-screen space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Header Slider</h1>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            + Add Image
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left w-12">#</th>
                <th className="px-4 py-3 text-left w-40">Image</th>
                <th className="px-4 py-3 text-left w-32">Status</th>
                <th className="px-4 py-3 text-right w-40">Actions</th>
              </tr>
            </thead>

            <tbody>
              {slides.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-400">
                    No header slides found
                  </td>
                </tr>
              )}

              {slides.map((slide, index) => (
                <tr
                  key={slide._id}
                  className={`border-t hover:bg-gray-50 transition
            ${deletingId === slide._id ? "opacity-60" : ""}`}
                >
                  {/* SR NO */}
                  <td className="px-4 py-4 font-medium">
                    {index + 1}
                  </td>

                  {/* IMAGE */}
                  <td className="px-4 py-4">
                    <img
                      src={slide.image.url}
                      alt="slide"
                      onClick={() => setPreviewImage(slide.image.url)}
                      className="w-32 h-16 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                    />
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4">
                    <button
                      onClick={async () => {
                        await axios.patch(
                          `${BASE_API}/${slide._id}/toggle`,
                          {},
                          { withCredentials: true }
                        );
                        fetchSlides();
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium border
                ${slide.active
                          ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                          : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                        }`}
                    >
                      {slide.active ? "Live" : "Draft"}
                    </button>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(slide)}
                        className="px-3 py-1.5 border rounded-lg hover:bg-gray-100 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(slide._id)}
                        disabled={deletingId === slide._id}
                        className={`px-3 py-1.5 border rounded-lg transition
                  ${deletingId === slide._id
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-600 hover:bg-red-50"
                          }`}
                      >
                        {deletingId === slide._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-xl space-y-4">
            <h2 className="text-xl font-semibold">
              {editingId ? "Update Header Image" : "Upload Header Image"}
            </h2>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              disabled={isSubmitting}
              onChange={handleImageChange}
            />

            {currentImage && !preview && (
              <img src={currentImage} className="w-full h-40 object-cover rounded" alt="" />
            )}

            {preview && (
              <img src={preview} className="w-full h-40 object-cover rounded" alt="" />
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setIsModalOpen(false)}
                className={isSubmitting ? "text-gray-400 cursor-not-allowed" : ""}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded flex items-center gap-2
                  ${isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                  }`}
              >
                {isSubmitting && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {editingId
                  ? isSubmitting ? "Updating..." : "Update"
                  : isSubmitting ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PREVIEW */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} className="max-h-[90vh] rounded" alt="" />
        </div>
      )}
    </>
  );
}
