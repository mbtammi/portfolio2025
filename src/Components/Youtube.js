import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Youtube.css';
import { FaVideo, FaArrowUpRightDots, FaGift, FaAudioDescription } from 'react-icons/fa6';
import ContactUs from './ContactUs';
import { motion } from 'framer-motion';

const Youtube = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const channelId = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const searchResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'id',
            channelId: channelId,
            maxResults: 20,
            order: 'date',
            key: apiKey,
          },
        });
    
        const videoIds = searchResponse.data.items
          .filter((item) => item.id.videoId)
          .map((item) => item.id.videoId)
          .join(',');
    
        const videosResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
          params: {
            part: 'snippet,contentDetails',
            id: videoIds,
            key: apiKey,
          },
        });
    
        // Filter videos to only include those over 1 minute long
        const filteredVideos = videosResponse.data.items.filter((video) => {
          const duration = video.contentDetails.duration; // ISO 8601 duration string (e.g., PT1M30S)
          const durationInSeconds = parseDuration(duration); // Convert duration to seconds
          return durationInSeconds > 60; // Only include videos longer than 1 minute
        });
    
        setVideos(filteredVideos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        setLoading(false);
      }
    };
    
    // Helper function to convert ISO 8601 duration to seconds
    const parseDuration = (duration) => {
      const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
      const matches = regex.exec(duration);
      const hours = parseInt(matches[1] || '0', 10);
      const minutes = parseInt(matches[2] || '0', 10);
      const seconds = parseInt(matches[3] || '0', 10);
      return hours * 3600 + minutes * 60 + seconds;
    };

    fetchVideos();
  }, [apiKey, channelId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="youtube-container">
      {/* Big Header */}
      <header className="header-section">
        <motion.h2 
          className="channel-name"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          mirotrying
        </motion.h2>
        <motion.p 
          className="channel-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Welcome to my channel! I reach thousands of viewers every month, exploring tech, productivity, and life as a software engineer. Check out my latest videos here!
        </motion.p>
      </header>
  
      {/* Video Section */}
      <motion.div 
        className="video-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {videos.slice(0, 4).map((video, index) => (
          <motion.div
            key={video.id}
            className={`video-card`}
            initial={{ opacity: 0, y: 20, rotate: 0 }}  // Initial state (not tilted)
            animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -5 : 5 }} // Tilt after animation starts
            transition={{
              delay: index * 0.2,  // Delay for sequential animations
              duration: 2.0,       // Duration for the initial animation
            }}
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="video-thumbnail-container">
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="video-thumbnail"
                />
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
  
      {/* Brand Section */}
      <section className="brand-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Let's Collaborate!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          I love working with diverse brands to create meaningful partnerships. I reach around 14.000 - 20.000 views monthly, and 80% of my demographic consists of 18-34 year old males. If you're looking for authentic, engaging collaboration and want your brand to be seen, get in touch with email: <a className='bold-yellow'>mirotammi44@gmail.com</a>!
        </motion.p>
        <motion.div
          className="pricing-boxes"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          {/* Pricing Boxes */}
          <motion.div key="integrated-ad" className="pricing-box" whileHover={{ scale: 1.05 }}>
            <h3><FaAudioDescription /> Integrated Ad</h3>
            <p>60-90 second ad inside my videos & Pinned comment + Links</p>
            <p className="price">$80-100</p>
            <button onClick={() => window.location.href = 'mailto:mirotammi44@gmail.com'}>
              Contact Me
            </button>
          </motion.div>
          <motion.div key="short-form" className="pricing-box" whileHover={{ scale: 1.05 }}>
            <h3><FaArrowUpRightDots /> Short-form Videos</h3>
            <p>15-30 second videos tailored to your brand.</p>
            <p className="price">$40</p>
            <button onClick={() => window.location.href = 'mailto:mirotammi44@gmail.com'}>
              Contact Me
            </button>
          </motion.div>
          <motion.div key="custom-sponsorship" className="pricing-box" whileHover={{ scale: 1.05 }}>
            <h3><FaVideo /> Custom Sponsorship</h3>
            <p>Tailored campaigns with creative flexibility.</p>
            <p className="price">???</p>
            <button onClick={() => window.location.href = 'mailto:mirotammi44@gmail.com'}>
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Us Section */}
      <ContactUs />
    </div>  
  );
};

export default Youtube;
