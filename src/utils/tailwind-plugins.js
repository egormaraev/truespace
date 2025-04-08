// Плагин для добавления утилит backdrop-blur
module.exports = {
  backdropBlurPlugin: function({ addUtilities }) {
    const newUtilities = {
      '.backdrop-blur': {
        'backdrop-filter': 'blur(8px)',
      },
      '.backdrop-blur-sm': {
        'backdrop-filter': 'blur(4px)',
      },
      '.backdrop-blur-md': {
        'backdrop-filter': 'blur(12px)',
      },
      '.backdrop-blur-lg': {
        'backdrop-filter': 'blur(16px)',
      },
      '.backdrop-blur-xl': {
        'backdrop-filter': 'blur(24px)',
      },
      '.backdrop-blur-2xl': {
        'backdrop-filter': 'blur(40px)',
      },
      '.backdrop-blur-3xl': {
        'backdrop-filter': 'blur(64px)',
      },
    };
    addUtilities(newUtilities);
  }
}; 