import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#2d6a4f', '#52b788', '#74c69d']}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <View style={styles.logoContainer}>
            <Ionicons name="leaf" size={50} color="#fff" />
            <Text style={styles.heroTitle}>HerbTrace</Text>
          </View>
          <Text style={styles.heroSubtitle}>
            Ensuring purity, authenticity, and transparency in every step of the journey
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle" size={24} color="#d8f3dc" />
              <Text style={styles.statText}>100% Authentic</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="leaf" size={24} color="#d8f3dc" />
              <Text style={styles.statText}>Farm to Consumer</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="shield-checkmark" size={24} color="#d8f3dc" />
              <Text style={styles.statText}>Quality Assured</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Scanner')}
          >
            <Ionicons name="qr-code" size={24} color="#2d6a4f" />
            <Text style={styles.ctaButtonText}>Start Scanning</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose HerbTrace?</Text>
        
        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Ionicons name="search" size={30} color="#2d6a4f" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Complete Transparency</Text>
            <Text style={styles.featureDescription}>
              Track every step from farm to your doorstep with our comprehensive traceability system.
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Ionicons name="shield-checkmark" size={30} color="#2d6a4f" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Quality Assurance</Text>
            <Text style={styles.featureDescription}>
              Each batch undergoes rigorous quality checks to ensure the highest standards.
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Ionicons name="phone-portrait" size={30} color="#2d6a4f" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Easy Verification</Text>
            <Text style={styles.featureDescription}>
              Simply scan the QR code to instantly access complete product information.
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Scanner')}
        >
          <Ionicons name="camera" size={24} color="#2d6a4f" />
          <Text style={styles.actionButtonText}>Scan QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('About')}
        >
          <Ionicons name="information-circle" size={24} color="#2d6a4f" />
          <Text style={styles.actionButtonText}>About System</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fff9',
  },
  heroSection: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#d8f3dc',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 100,
  },
  statText: {
    color: '#d8f3dc',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ctaButtonText: {
    color: '#2d6a4f',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d6a4f',
    textAlign: 'center',
    marginBottom: 30,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  featureIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#d8f3dc',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d6a4f',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: (width - 60) / 2,
  },
  actionButtonText: {
    color: '#2d6a4f',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;