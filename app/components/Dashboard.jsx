'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [stories, setStories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStory, setCurrentStory] = useState({ title: '', thumbnail: '', slug: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStories = async () => {n
      try {
        setLoading(true);
        const response = await fetch('/api/stories');
        if (!response.ok) throw new Error('Failed to fetch stories');
        const data = await response.json();
        setStories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const handleCreateOrUpdateStory = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/stories/${currentStory.slug}` : '/api/stories';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: currentStory.title,
          thumbnail: currentStory.thumbnail,
          slug: currentStory.slug,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save story');
      }

      setIsEditing(false);
      setCurrentStory({ title: '', thumbnail: '', slug: '' });
      fetchStories();  // Re-fetch the stories to update the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (story) => {
    setCurrentStory(story);
    setIsEditing(true);
  };

  const handleDelete = async (slug) => {
    try {
      const response = await fetch(`/api/stories/${slug}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete story');
      }
      fetchStories();  // Re-fetch the stories to update the list
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Dashboard - Manage Web Stories
        </h1>
  
        {/* Story form for create/update */}
        <form onSubmit={handleCreateOrUpdateStory} className="mb-8">
          <input
            type="text"
            name="title"
            placeholder="Story Title"
            value={currentStory.title}
            onChange={(e) => setCurrentStory({ ...currentStory, title: e.target.value })}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <input
            type="url"
            name="thumbnail"
            placeholder="Thumbnail URL"
            value={currentStory.thumbnail}
            onChange={(e) => setCurrentStory({ ...currentStory, thumbnail: e.target.value })}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          {!isEditing ? (
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create Story</button>
          ) : (
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">Update Story</button>
          )}
        </form>

        {/* Display stories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div key={story.id} className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg bg-white">
              <img
                src={story.thumbnail}
                alt={story.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:from-blue-900/70 transition-all"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-lg font-bold truncate">{story.title}</h2>
                <p className="text-sm opacity-75">
                  {new Date(story.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button onClick={() => handleEdit(story)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(story.slug)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
