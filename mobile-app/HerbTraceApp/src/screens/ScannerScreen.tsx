import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type ScannerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Scanner'>;

interface Props {
  navigation: ScannerScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

const ScannerScreen: React.FC<Props> = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    Alert.alert(
      'QR Code Scanned!',
      `Package ID: ${data}`,
      [
        {
          text: 'Scan Again',
          onPress: () => setScanned(false),
          style: 'cancel',
        },
        {
          text: 'View Details',
          onPress: () => navigation.navigate('Results', { packageId: data }),
        },
      ]
    );
  };

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="videocam-off" size={64} color="#666" />
        <Text style={styles.permissionText}>No access to camera</Text>
        <Text style={styles.permissionSubtext}>
          Please enable camera permission to scan QR codes.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.permissionButton, styles.secondaryButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.permissionButtonText, styles.secondaryButtonText]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        <View style={styles.overlay}>
          {/* Top overlay */}
          <View style={styles.topOverlay}>
            <Text style={styles.instructionText}>
              Position QR code within the frame
            </Text>
          </View>

          {/* Scanner Frame */}
          <View style={styles.scannerFrame}>
            <View style={styles.scannerContainer}>
              <View style={styles.scannerBox}>
                {/* Corner indicators */}
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            </View>
          </View>

          {/* Bottom overlay with controls */}
          <View style={styles.bottomOverlay}>
            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
                <Text style={styles.controlButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleCameraFacing}
              >
                <Ionicons name="camera-reverse" size={24} color="#fff" />
                <Text style={styles.controlButtonText}>Flip</Text>
              </TouchableOpacity>

              {scanned && (
                <TouchableOpacity
                  style={styles.scanAgainButton}
                  onPress={() => setScanned(false)}
                >
                  <Ionicons name="refresh" size={24} color="#2d6a4f" />
                  <Text style={styles.scanAgainButtonText}>Scan Again</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.tipContainer}>
              <Ionicons name="bulb" size={16} color="#d8f3dc" />
              <Text style={styles.tipText}>
                Make sure the QR code is well-lit and centered
              </Text>
            </View>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#f8fff9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  permissionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d6a4f',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  permissionSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: '#2d6a4f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2d6a4f',
  },
  secondaryButtonText: {
    color: '#2d6a4f',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  scannerFrame: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerContainer: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  scannerBox: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#52b788',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  controlButton: {
    alignItems: 'center',
    padding: 10,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '500',
  },
  scanAgainButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  scanAgainButtonText: {
    color: '#2d6a4f',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '600',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  tipText: {
    color: '#d8f3dc',
    fontSize: 12,
    marginLeft: 5,
    textAlign: 'center',
  },
});

export default ScannerScreen;