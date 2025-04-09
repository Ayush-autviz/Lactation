// Snackbar.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';

const Snackbar = ({
  visible,
  message,
  duration = 3000,
  onDismiss,
  actionText,
  onActionPress,
}) => {
  const [fadeAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto dismiss after duration
      const timer = setTimeout(() => {
        dismissSnackbar();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const dismissSnackbar = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss && onDismiss();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
        {actionText && (
          <TouchableOpacity onPress={onActionPress || dismissSnackbar}>
            <Text style={styles.actionText}>{actionText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  content: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  actionText: {
    color: '#00ff00',
    fontSize: 14,
    marginLeft: 16,
    fontWeight: 'bold',
  },
});

export default Snackbar;