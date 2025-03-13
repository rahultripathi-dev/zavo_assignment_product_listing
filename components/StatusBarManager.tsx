import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';

interface StatusBarManagerProps {
  style: 'light-content' | 'dark-content';
  backgroundColor?: string;
  translucent?: boolean;
}

const StatusBarManager: React.FC<StatusBarManagerProps> = ({ 
  style, 
  backgroundColor = 'transparent',
  translucent = false
}) => {
  useEffect(() => {
    // Set status bar style
    StatusBar.setBarStyle(style);
    
    // Android-specific settings
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor);
      StatusBar.setTranslucent(translucent);
    }
    
    // Cleanup when component unmounts
    return () => {
      // Reset to default values when navigating away
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#FFFFFF');
        StatusBar.setTranslucent(false);
      }
    };
  }, [style, backgroundColor, translucent]);

  return null;
};

export default StatusBarManager; 