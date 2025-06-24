import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Linking,
  Platform,
  SafeAreaView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const FeatureShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const features = [
    {
      id: 1,
      title: 'Cross-Platform',
      description: 'Write once, run on iOS and Android',
      icon: '📱',
      color: '#667eea',
    },
    {
      id: 2,
      title: 'Native Performance',
      description: 'Bridge to native modules for optimal speed',
      icon: '⚡',
      color: '#764ba2',
    },
    {
      id: 3,
      title: 'Hot Reloading',
      description: 'See changes instantly during development',
      icon: '🔥',
      color: '#f093fb',
    },
    {
      id: 4,
      title: 'Rich Ecosystem',
      description: 'Vast library of third-party packages',
      icon: '🌟',
      color: '#4facfe',
    },
  ];

  const tabs = ['Features', 'Animations', 'Platform', 'Interactions'];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const startRotation = () => {
    setIsAnimating(true);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
      setIsAnimating(false);
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing React Native app! 🚀',
        title: 'React Native Showcase',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleVibration = () => {
    if (Platform.OS === 'ios') {
      Vibration.vibrate([0, 250, 250, 250]);
    } else {
      Vibration.vibrate(250);
    }
  };

  const handleLinking = () => {
    Linking.openURL('https://reactnative.dev/');
  };

  const handlePlatformAlert = () => {
    Alert.alert(
      'Platform Detection',
      `You're running on ${Platform.OS} ${Platform.Version}`,
      [
        { text: 'Cool!', style: 'default' },
        { text: 'Awesome!', style: 'cancel' },
      ]
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <FlatList
            data={features}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <Animated.View
                style={[
                  styles.featureCard,
                  {
                    backgroundColor: item.color,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                    opacity: fadeAnim,
                  },
                ]}
              >
                <Text style={styles.featureIcon}>{item.icon}</Text>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDescription}>{item.description}</Text>
              </Animated.View>
            )}
            contentContainerStyle={styles.featuresGrid}
          />
        );

      case 1:
        return (
          <View style={styles.animationContainer}>
            <Animated.View
              style={[
                styles.animationBox,
                {
                  transform: [
                    {
                      rotate: rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                    { scale: scaleAnim },
                  ],
                },
              ]}
            >
              <Text style={styles.animationText}>🎨</Text>
            </Animated.View>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#ff6b6b' }]}
              onPress={startRotation}
              disabled={isAnimating}
            >
              <Text style={styles.buttonText}>
                {isAnimating ? 'Animating...' : 'Start Animation'}
              </Text>
            </TouchableOpacity>
          </View>
        );

      case 2:
        return (
          <View style={styles.platformContainer}>
            <View style={styles.platformInfo}>
              <Text style={styles.platformTitle}>Platform Information</Text>
              <Text style={styles.platformDetail}>OS: {Platform.OS}</Text>
              <Text style={styles.platformDetail}>Version: {Platform.Version}</Text>
              <Text style={styles.platformDetail}>
                Is Tablet: {Platform.isTV ? 'Yes' : 'No'}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#4ecdc4' }]}
              onPress={handlePlatformAlert}
            >
              <Text style={styles.buttonText}>Show Platform Alert</Text>
            </TouchableOpacity>
          </View>
        );

      case 3:
        return (
          <View style={styles.interactionContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#45b7d1' }]}
              onPress={handleShare}
            >
              <Text style={styles.buttonText}>📤 Share App</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#f39c12' }]}
              onPress={handleVibration}
            >
              <Text style={styles.buttonText}>📳 Vibrate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#e74c3c' }]}
              onPress={handleLinking}
            >
              <Text style={styles.buttonText}>🔗 Open RN Docs</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateX: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.headerTitle}>React Native</Text>
        <Text style={styles.headerSubtitle}>Feature Showcase</Text>
      </Animated.View>

      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              activeTab === index && styles.activeTab,
            ]}
            onPress={() => setActiveTab(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {renderTabContent()}
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Built with ❤️ using React Native
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#bdc3c7',
    fontWeight: '300',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#34495e',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 5,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#3498db',
  },
  tabText: {
    color: '#bdc3c7',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  featuresGrid: {
    paddingBottom: 20,
  },
  featureCard: {
    flex: 1,
    margin: 8,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationBox: {
    width: 100,
    height: 100,
    backgroundColor: '#9b59b6',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#9b59b6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  animationText: {
    fontSize: 40,
  },
  platformContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformInfo: {
    backgroundColor: '#34495e',
    padding: 30,
    borderRadius: 15,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  platformTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 20,
  },
  platformDetail: {
    fontSize: 16,
    color: '#bdc3c7',
    marginBottom: 10,
  },
  interactionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  actionButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  footerText: {
    color: '#bdc3c7',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default FeatureShowcase;