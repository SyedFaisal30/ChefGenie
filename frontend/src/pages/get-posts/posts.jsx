import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GetPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/get-posts"); 
        setPosts(response.data.message);        
      } catch (err) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-center p-4">
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[70%] max-w-3xl mb-6">
          {/* Title & Author */}
          <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
          <p className="text-sm text-gray-600 mt-1">By {post.username}</p>

          {/* Horizontal Layout: Ingredients & Instructions */}
          <div className="mt-4 flex flex-col md:flex-row gap-8">
            {/* Ingredients */}
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-semibold text-gray-700">Ingredients:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {post.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-semibold text-gray-700">Instructions:</h3>
              <p className="text-gray-600 whitespace-pre-line">{post.instructions}</p>
            </div>
          </div>

          {/* Tags Section */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Tags:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Post Date */}
          <p className="text-sm text-gray-500 mt-4">Posted on {new Date(post.createdAt).toDateString()}</p>
        </div>
      ))}
    </div>
  );
}
