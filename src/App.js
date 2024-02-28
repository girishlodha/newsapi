import React, { useState, useEffect } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
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
      const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=2024-02-20&sortBy=publishedAt&apiKey=83184342ed714f4f90d2c6faa6f1cf20`);
      const data = await response.json();
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
        <button type="submit" className="m-2   px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      <div className='flex flex-col gap-16'>
        {articles.map((article, index) => (
          
            <Card
              extra={<a href={article.url} className='text-blue-500'>Read More</a>}
              className="mb-2 w-full h-auto object-cover"
              cover={
                <img
                  alt="example"
                  src={article.urlToImage}
                  className='mb-2 w-full h-auto object-cover'
                  // style={{
                  //   height: 500,
              
                  // }}

                />
              }
              
            >
              <Meta
                title={article.title}
                description={article.description}
              />
              <Meta
                //title={article.title}
                title={`Published At: ${article.publishedAt}`}
              />
              <Meta
                //title={article.title}
                title={`Author: ${article.author}`}
              />
            </Card>
           
         

        ))}
        </div>
    </div>
  );
};

export default NewsComponent;
