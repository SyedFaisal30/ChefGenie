import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePostForm from "../../components/createPost";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("myPosts");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", email: "" });

  // State for Update Modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [postData, setPostData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    tags: "",
  });

  // State for Delete Confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    if (username && email) setUser({ username, email });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/users/get-user-post`,
        {
          withCredentials: true,
        }
      );

      setPosts(response.data.message || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new post to the posts state (pass this to CreatePostForm)
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setActiveTab("myPosts"); // Switch to myPosts tab after creating a post
    toast.success("Post created successfully!");
  };

  // 🟡 **Open Update Post Form**
  const openUpdateForm = (post) => {
    setEditingPost(post._id);
    setPostData({
      title: post.title,
      ingredients: post.ingredients.join(", "),
      instructions: post.instructions || "",
      tags: post.tags.join(", "),
    });
    setIsUpdateModalOpen(true);
  };

  // 🔄 **Handle Form Input Change**
  const handleInputChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  // 🛠 **Update an Existing Post**
  const updatePost = async () => {
    try {
      const accessToken = localStorage.getItem("ate");
      await axios.put(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/users/update-post/${editingPost}`,
        {
          title: postData.title,
          ingredients: postData.ingredients.split(",").map((i) => i.trim()),
          instructions: postData.instructions,
          tags: postData.tags.split(",").map((t) => t.trim()),
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      // 🆕 **Update the UI Immediately**
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === editingPost
            ? {
                ...post,
                title: postData.title,
                ingredients: postData.ingredients
                  .split(",")
                  .map((i) => i.trim()),
                instructions: postData.instructions,
                tags: postData.tags.split(",").map((t) => t.trim()),
              }
            : post
        )
      );

      setIsUpdateModalOpen(false); // Close modal
      toast.success("Post updated successfully!");
    } catch (error) {
      toast.error(
        "Update failed: " + (error.response?.data?.message || "Unknown error")
      );
    }
  };

  // ❓ **Open Delete Confirmation Modal**
  const openDeleteConfirmation = (postId) => {
    setDeletingPostId(postId);
    setIsDeleteModalOpen(true);
  };

  // ❌ **Delete Post**
  const deletePost = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/users/delete-post/${deletingPostId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      // 🆕 **Remove from UI Immediately**
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== deletingPostId)
      );
      setIsDeleteModalOpen(false);
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error(
        "Delete failed: " + (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f8f8] py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3xl w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* User Info */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">{user.username || "User"}</h2>
          <p className="text-gray-600">{user.email || "user@example.com"}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b mb-6 p-6">
          <button
            onClick={() => setActiveTab("myPosts")}
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "myPosts"
                ? "border-b-2 border-yellow-600 text-yellow-600 font-medium"
                : "text-gray-500"
            }`}
          >
            My Posts
          </button>
          <button
            onClick={() => setActiveTab("createPost")}
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "createPost"
                ? "border-b-2 border-yellow-600 text-yellow-600 font-medium"
                : "text-gray-500"
            }`}
          >
            Create Post
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "myPosts" ? (
          <>
            <h2 className="text-xl font-bold mb-4">My Posts</h2>
            {loading ? (
              <p className="text-center text-gray-500">Loading posts...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="mb-4 p-4 border rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    Ingredients: {post.ingredients.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Instructions: {post.instructions}
                  </p>
                  <p className="text-sm text-gray-500">
                    Tags: {post.tags.join(", ")}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openUpdateForm(post)}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => openDeleteConfirmation(post._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts found.</p>
            )}
          </>
        ) : (
          <CreatePostForm addPost={addPost} />
        )}

        {/* Update Post Modal */}
        {isUpdateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Post</h2>
              <input
                type="text"
                name="title"
                value={postData.title}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
                placeholder="Title"
              />
              <textarea
                name="ingredients"
                value={postData.ingredients}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
                placeholder="Ingredients (comma separated)"
              />
              <textarea
                name="instructions"
                value={postData.instructions}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
                placeholder="Instructions"
              />
              <input
                type="text"
                name="tags"
                value={postData.tags}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded"
                placeholder="Tags (comma separated)"
              />
              <div className="flex justify-end">
                <button
                  onClick={updatePost}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p className="mb-4">
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={deletePost}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2 cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
