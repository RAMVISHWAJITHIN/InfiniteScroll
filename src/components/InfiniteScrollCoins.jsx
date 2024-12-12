import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Shimmer from './Shimmer';



const InfiniteScrollCoins = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Check if there are more items

  // Fetch coins from CoinGecko API
  const fetchCoins = async () => {
    try {
     
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: page, // Use page state here
            sparkline: false
          }
        }
      );

      // Check if we received data
      if (response.data.length === 0) {
        setHasMore(false); // No more data to fetch
        console.log('No more data to fetch.');
      } else {
        //console.log('Fetched data:', response.data);  Log fetched data for debugging
        setCoins((prevCoins) => [...prevCoins, ...response.data]); // Add new coins to the list
      }
    } catch (error) {
      console.error('Error fetching data from CoinGecko:', error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [page]); // Fetch data whenever the page number changes

  return (
    <div className="container mx-auto p-4">
      {/* Infinite Scroll Component */}
      <InfiniteScroll
        dataLength={coins.length}
        next={() => {
          console.log('Loading next page...');
          setPage((prevPage) => prevPage + 1); // Increment page for next batch of data
        }}
        hasMore={hasMore} // Determines if more data should be fetched
        loader={<h4 className="text-center text-lg">Loading...</h4>}
        endMessage={<p className="text-center text-lg text-gray-500">No more cryptocurrencies</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map over the coins array and render each coin as a card */}
          {coins.length === 0
            ? Array(16)
                .fill(0)
                .map((_, index) => <Shimmer key={index} />) // Show shimmer while loading
            : coins.map((coin,index) => (
                <div
                key={`${coin.id}-${index}`} // Combine id and index to ensure uniqueness
                  className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all ease-in-out duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-800">{coin.name}</h3>
                  <p className="text-center text-gray-600 text-sm">({coin.symbol.toUpperCase()})</p>
                  <p className="text-center text-lg font-bold text-gray-900 mt-2">${coin.current_price}</p>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    Market Cap: ${coin.market_cap.toLocaleString()}
                  </p>
                </div>
              ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollCoins;
