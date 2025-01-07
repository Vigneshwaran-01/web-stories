'use client';
import { useEffect, useState } from 'react';

const WebStory = ({ slug }) => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStory = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/stories/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const storyData = await response.json();
        console.log(storyData);
        
        // Don't wrap the story data in an array
        setStory({
          author: storyData.author,
          category: storyData.category,
          created_at: new Date(storyData.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          id: storyData.id,
          thumbnail: storyData.thumbnail,
          title: storyData.title,
          pages: storyData.pages || []
        });

        // Load AMP scripts only once
        if (!document.querySelector('script[src="https://cdn.ampproject.org/v0.js"]')) {
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://cdn.ampproject.org/v0.js';
          document.head.appendChild(script);

          const ampStoryScript = document.createElement('script');
          ampStoryScript.async = true;
          ampStoryScript.custom_element = "amp-story";
          ampStoryScript.src = 'https://cdn.ampproject.org/v0/amp-story-1.0.js';
          document.head.appendChild(ampStoryScript);
        }
      } catch (err) {
        console.error('Error loading story:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadStory();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading story...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Story not found</div>
      </div>
    );
  }

  return (
    <div className="webstory-container">
      <amp-story
        standalone=""
        title={story.title}
        publisher="Your Publisher Name"
        publisher-logo-src={story.thumbnail}
        poster-portrait-src={story.thumbnail}
      >
        {/* Cover Page */}
        <amp-story-page id="cover">
          <amp-story-grid-layer template="fill">
            <amp-img
              src={story.thumbnail}
              width="720"
              height="1280"
              layout="responsive"
              alt={story.title}
            />
          </amp-story-grid-layer>
          <amp-story-grid-layer template="vertical" class="bottom">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-white mb-4">{story.title}</h1>
              <div className="flex items-center text-white">
                <span className="mr-4">{story.author}</span>
                <span>{story.created_at}</span>
              </div>
            </div>
          </amp-story-grid-layer>
        </amp-story-page>

        {/* Story Pages */}
        {story.pages.map((page, index) => (
          <amp-story-page id={`page-${index + 1}`} key={index}>
            <amp-story-grid-layer template="fill">
              {page.media_type === 'video' ? (
                <amp-video
                  autoplay=""
                  loop=""
                  width="720"
                  height="1280"
                  poster={story.thumbnail}
                  layout="responsive"
                >
                  <source src={page.media_url} type="video/mp4" />
                </amp-video>
              ) : (
                <amp-img
                  src={page.media_url}
                  width="720"
                  height="1280"
                  layout="responsive"
                  alt={page.title}
                />
              )}
            </amp-story-grid-layer>
            <amp-story-grid-layer template="vertical" class="bottom">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-4">{page.title}</h2>
                <p className="text-lg text-white">{page.description}</p>
              </div>
            </amp-story-grid-layer>
          </amp-story-page>
        ))}
      </amp-story>
    </div>
  );
};

export default WebStory;