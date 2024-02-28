import React, { useState } from 'react';
import { Card } from 'antd';
import axios from 'axios'; // Changed import statement

const { Meta } = Card;

const NewsComponent = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&from=2024-02-20&sortBy=publishedAt&apiKey=83184342ed714f4f90d2c6faa6f1cf20`);
      const data = response.data;
      const topArticles = data.articles.slice(0, 5);
      setArticles(topArticles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-16">
      <h2 className="text-2xl font-bold mb-4 text-center">Latest News Articles</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter search query"
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="m-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      <div className='grid grid-cols-2 gap-16'>
        {articles.map((article, index) => (
          <Card
            key={index} // Added key prop
            extra={<a href={article.url} className='text-blue-500'>Read More</a>}
            className="mb-2  h-auto object-cover"
            cover={
              <img
                alt="img"
                src={article.urlToImage}
                className='mb-2 w-full h-2/3 object-cover'
              />
            }
          >
          <div>
          <Meta
          title={article.title}
          description={article.description}
        />
        <Meta
          title={`Published At: ${article.publishedAt}`}
        />
        <Meta
          title={`Author: ${article.author}`}
        />
          </div>
           
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
