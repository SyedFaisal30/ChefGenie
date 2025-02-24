import { useState, useEffect } from "react";
import axios from "axios";
import CreatePostForm from "../../components/createPost";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("myPosts");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", email: "" });

  // Fetch user info from localStorage
  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username && email) {
      setUser({ username, email });
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setError("Authentication error. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:8000/api/users/get-user-post", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data && Array.isArray(response.data.message)) {
          setPosts(response.data.message);
        } else {
          setPosts([]);
          setError("No posts found.");
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch posts");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
    setActiveTab("myPosts");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f8f8f8]">
      <div className="max-w-3xl w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* User Info */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">{user.username || "User"}</h2>
          <p className="text-gray-600">{user.email || "user@example.com"}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-4 flex justify-center border-b pb-2">
          <button
            className={`px-4 py-2 ${activeTab === "myPosts" ? "text-yellow-600 border-b-2 border-yellow-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("myPosts")}
          >
            My Posts
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "createPosts" ? "text-yellow-600 border-b-2 border-yellow-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("createPosts")}
          >
            Create Post
          </button>
        </div>

        {/* My Posts Section */}
        {activeTab === "myPosts" && (
          <div>
            {loading ? (
              <p className="text-center text-gray-500">Loading posts...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="mb-4 p-4 border rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    Ingredients: {Array.isArray(post.ingredients) ? post.ingredients.join(", ") : "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">Instructions: {post.instructions || "No instructions"}</p>
                  <p className="text-sm text-gray-500">
                    Tags: {Array.isArray(post.tags) ? post.tags.join(", ") : "No tags"}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg">Update</button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts found.</p>
            )}
          </div>
        )}

        {/* Create Post Section */}
        {activeTab === "createPosts" && <CreatePostForm addPost={addPost} />}
      </div>
    </div>
  );
};

export default UserProfile;
