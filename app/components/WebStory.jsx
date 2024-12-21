'use client';
import { useEffect, useState } from 'react';

const WebStory = () => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fallbackImage = 'https://via.placeholder.com/720x1280/1a1a1a/ffffff?text=Image+Not+Available';

  useEffect(() => {
    const loadStory = async () => {
      try {
        setLoading(true);
        // Fetch all stories first
        const response = await fetch('http://localhost:8080/api/stories');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const stories = await response.json();
        // Get the first story from the list
        if (stories && stories.length > 0) {
          // Fetch the full story details using the first story's slug
          const storyResponse = await fetch(`http://localhost:8080/api/stories/${stories[0].slug}`);
          if (!storyResponse.ok) {
            throw new Error(`HTTP error! status: ${storyResponse.status}`);
          }
          const storyData = await storyResponse.json();
          console.log('Story data:', storyData);
          setStory(storyData);
        } else {
          throw new Error('No stories found');
        }

        // Load AMP scripts
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://cdn.ampproject.org/v0.js';
        document.body.appendChild(script);

        const ampStoryScript = document.createElement('script');
        ampStoryScript.async = true;
        ampStoryScript.custom_element = "amp-story";
        ampStoryScript.src = 'https://cdn.ampproject.org/v0/amp-story-1.0.js';
        document.body.appendChild(ampStoryScript);
      } catch (err) {
        console.error('Error loading story:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, []);

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
        <div className="text-xl text-red-600">
          Error loading story: {error}
        </div>
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
        publisher-logo-src={story.thumbnail || fallbackImage}
        poster-portrait-src={story.thumbnail || fallbackImage}
      >
        {/* Cover Page */}
        <amp-story-page id="cover">
          <amp-story-grid-layer template="fill">
            <amp-img
              src={story.thumbnail || fallbackImage}
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
        {story.pages?.map((page, index) => (
          <amp-story-page id={`page-${index + 1}`} key={index}>
            <amp-story-grid-layer template="fill">
              {page.media_type === 'image' ? (
                <amp-img
                  src={page.media_url || fallbackImage}
                  width="720"
                  height="1280"
                  layout="responsive"
                  alt={page.title}
                />
              ) : (
                <amp-video
                  autoplay=""
                  loop=""
                  width="720"
                  height="1280"
                  poster={story.thumbnail || fallbackImage}
                  layout="responsive"
                >
                  <source src={page.media_url} type="video/mp4" />
                </amp-video>
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

      {/* <style jsx global>{`
        .webstory-container {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
        }
        amp-story {
          background: #000;
        }
        amp-story-grid-layer.bottom {
          align-content: end;
          padding-bottom: 40px;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
        }
        amp-story-grid-layer.bottom > div {
          width: 100%;
        }
      `}</style> */}
    </div>
  );
};

export default WebStory;