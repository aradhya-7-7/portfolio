import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const SocialMenu = ({ isOpen, onClose, position }) => {
  const menuRef = useRef(null);

  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      label: 'GitHub',
      url: 'https://github.com/aradhya-7-7',
      color: 'hover:text-gray-700 dark:hover:text-black'
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aradhya08oc01/',
      color: 'hover:text-blue-600'
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      label: 'Instagram',
      url: 'https://instagram.com/aradhya.7',
      color: 'hover:text-pink-600'
    },
    {
      icon: <FaXTwitter className="w-5 h-5" />,
      label: 'X (Twitter)',
      url: 'https://x.com/yourusername',
      color: 'hover:text-gray-800 dark:hover:text-black'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute z-50 rounded-lg p-2 min-w-[200px] backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
      style={{
        top: position.y + 'px',
        left: position.x + 'px',
        animation: 'scaleIn 0.2s ease-out'
      }}
    >
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${link.color} hover:bg-white/20 dark:hover:bg-gray-700/50`}
        >
          {link.icon}
          <span className="text-sm font-medium">{link.label}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialMenu;
