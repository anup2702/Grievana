import React, { useState, useEffect } from "react";
import API from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminCategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get("/admin/categories");
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch categories.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      const response = await API.post("/admin/categories", { name: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory("");
    } catch (error) {
      setError("Failed to add category.");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await API.delete(`/admin/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      setError("Failed to delete category.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.name.trim()) return;
    try {
      const response = await API.put(
        `/admin/categories/${editingCategory._id}`,
        { name: editingCategory.name }
      );
      setCategories(
        categories.map((cat) =>
          cat._id === editingCategory._id ? response.data : cat
        )
      );
      setEditingCategory(null);
    } catch (error) {
      setError("Failed to update category.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className="mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="border p-2 rounded-l-md flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
      </form>

      {/* Edit Category Form */}
      {editingCategory && (
        <form onSubmit={handleUpdateCategory} className="mb-6">
          <div className="flex items-center">
            <input
              type="text"
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, name: e.target.value })
              }
              className="border p-2 rounded-l-md flex-grow"
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600"
            >
              Update Category
            </button>
            <button
              onClick={() => setEditingCategory(null)}
              className="bg-gray-500 text-white p-2 ml-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <span className="font-semibold">{category.name}</span>
            <div>
              <button
                onClick={() => setEditingCategory(category)}
                className="text-blue-500 hover:underline mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategoriesSection;