import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type AboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'About'>;

interface Props {
  navigation: AboutScreenNavigationProp;
}

const AboutScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="leaf" size={64} color="#2d6a4f" />
        <Text style={styles.headerTitle}>About HerbTrace</Text>
        <Text style={styles.headerSubtitle}>
          Ensuring authenticity in Ayurvedic products through advanced traceability
        </Text>
      </View>

      {/* System Overview */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="information-circle" size={24} color="#2d6a4f" />
          <Text style={styles.cardTitle}>System Overview</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.description}>
            Our Ayurvedic Herb Traceability System ensures complete transparency from farm to consumer. 
            Each batch of herbs is assigned a unique digital ID that tracks its entire journey.
          </Text>
          <Text style={styles.description}>
            By scanning the QR code on your product, you can verify its origin, processing methods, 
            and quality assurance measures. This system combats counterfeit products, builds trust, 
            and upholds the integrity of traditional Ayurvedic practices.
          </Text>
        </View>
      </View>

      {/* Features */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="star" size={24} color="#2d6a4f" />
          <Text style={styles.cardTitle}>Key Features</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.featureItem}>
            <Ionicons name="qr-code" size={20} color="#52b788" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>QR Code Scanning</Text>
              <Text style={styles.featureDescription}>
                Instant product verification using your device's camera
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="map" size={20} color="#52b788" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Farm Traceability</Text>
              <Text style={styles.featureDescription}>
                Track herbs from their origin farm to processing facilities
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark" size={20} color="#52b788" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Quality Assurance</Text>
              <Text style={styles.featureDescription}>
                Detailed quality check records at every step
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="time" size={20} color="#52b788" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Real-time Verification</Text>
              <Text style={styles.featureDescription}>
                Instant access to up-to-date product information
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Benefits */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="checkmark-circle" size={24} color="#2d6a4f" />
          <Text style={styles.cardTitle}>Benefits</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark" size={16} color="#28a745" />
            <Text style={styles.benefitText}>Combat counterfeit products</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark" size={16} color="#28a745" />
            <Text style={styles.benefitText}>Build consumer trust and confidence</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark" size={16} color="#28a745" />
            <Text style={styles.benefitText}>Uphold traditional Ayurvedic practices</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark" size={16} color="#28a745" />
            <Text style={styles.benefitText}>Ensure product authenticity and purity</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark" size={16} color="#28a745" />
            <Text style={styles.benefitText}>Support ethical farming practices</Text>
          </View>
        </View>
      </View>

      {/* How It Works */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="help-circle" size={24} color="#2d6a4f" />
          <Text style={styles.cardTitle}>How It Works</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Scan QR Code</Text>
              <Text style={styles.stepDescription}>
                Use your device's camera to scan the QR code on the product packaging
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Retrieve Information</Text>
              <Text style={styles.stepDescription}>
                The app fetches detailed information about the product's journey
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>View Traceability</Text>
              <Text style={styles.stepDescription}>
                See complete details from farm origin to processing and packaging
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Technology */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="cog" size={24} color="#2d6a4f" />
          <Text style={styles.cardTitle}>Technology</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.description}>
            HerbTrace uses advanced database technology and mobile app development to provide 
            a seamless experience for tracking Ayurvedic herbs throughout their supply chain.
          </Text>
          <View style={styles.techGrid}>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Database</Text>
              <Text style={styles.techValue}>MongoDB</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Backend</Text>
              <Text style={styles.techValue}>FastAPI</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Mobile</Text>
              <Text style={styles.techValue}>React Native</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Scanner</Text>
              <Text style={styles.techValue}>Expo Camera</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="mail" size={24} color="#2d6a4f" />
          <Text style={styles.cardTitle}>Contact</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={16} color="#52b788" />
            <Text style={styles.contactText}>info@herbtrace.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call" size={16} color="#52b788" />
            <Text style={styles.contactText}>+1 (555) 123-4567</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="globe" size={16} color="#52b788" />
            <Text style={styles.contactText}>www.herbtrace.com</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Scanner')}
        >
          <Ionicons name="qr-code" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Start Scanning</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Back to Home</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 HerbTrace. All rights reserved.</Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fff9',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d6a4f',
    marginTop: 15,
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d6a4f',
    marginLeft: 10,
  },
  cardContent: {
    padding: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureText: {
    flex: 1,
    marginLeft: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d6a4f',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#2d6a4f',
    marginLeft: 10,
    fontWeight: '500',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2d6a4f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d6a4f',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  techItem: {
    width: '48%',
    backgroundColor: '#f8fff9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  techLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  techValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d6a4f',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#2d6a4f',
    marginLeft: 10,
    fontWeight: '500',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d6a4f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 0.45,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2d6a4f',
  },
  secondaryButtonText: {
    color: '#2d6a4f',
    marginLeft: 0,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  versionText: {
    fontSize: 10,
    color: '#999',
  },
});

export default AboutScreen;