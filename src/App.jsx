import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import PostList from './PostList';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchHackerNews = async (query) => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setSearchResults(response.data.hits);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setSelectedPost(null);
    }
  };

  const fetchPostDetails = async (objectID) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/items/${objectID}`
      );
      setSelectedPost(response.data);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedPost) {
      fetchPostDetails(selectedPost);
    }
  }, [selectedPost]);

  return (
    <div>
      <SearchBar onSearch={searchHackerNews} />
      {isLoading ? (
        <div class='spinner-border text-primary' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      ) : selectedPost ? (
        <div>
          <h2>Title: {selectedPost.title}</h2>
          <p>
            {' '}
            <b>Points:</b> {selectedPost.points}
          </p>
          <h3>All Comments</h3>
          {selectedPost.children ? (
            <ul>
              {selectedPost.children.map((comment, index) => (
                <div>
                  <li key={index}>{comment.text}</li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No comments available for this post.</p>
          )}
        </div>
      ) : (
        <PostList posts={searchResults} onSelectPost={setSelectedPost} />
      )}
    </div>
  );
}

export default App;
