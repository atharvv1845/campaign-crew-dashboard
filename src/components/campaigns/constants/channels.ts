
// Available channels for outreach
export const availableChannels = [
  { id: 'email', name: 'Email' },
  { id: 'phone', name: 'Call' },
  { id: 'sms', name: 'SMS' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'twitter', name: 'Twitter' },
  { id: 'whatsapp', name: 'WhatsApp' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'telegram', name: 'Telegram' },
];

// Function to get custom platforms from localStorage
export const getCustomPlatforms = () => {
  try {
    return JSON.parse(localStorage.getItem('customPlatforms') || '[]').map((id: string) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1) // Capitalize first letter
    }));
  } catch (error) {
    console.error("Error loading custom platforms:", error);
    return [];
  }
};

// Get all available channels including custom ones
export const getAllChannels = () => {
  return [...availableChannels, ...getCustomPlatforms()];
};
