import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { ApiService } from '../services/ApiService';

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface Props {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
}

interface PackageData {
  package_details: {
    package_id: string;
    product_name: string;
    brand: string;
    packaging_type: { english: string; sanskrit: string };
    packaging_date: string;
    expiry_date: string;
    packaging_unit: string;
    quantity_units: string;
    quality_check: string;
  };
  retailer_details?: {
    retailer: {
      name: string;
      license: string;
      location: string;
    };
    date_received: string;
  };
  ingredients: Array<{
    batch_id: string;
    form: { english: string; sanskrit: string };
    herb_details: {
      herb_name: string;
      scientific_name: string;
    };
    farm_details: {
      farmer?: {
        name: string;
        certifications?: string[];
      };
      farm_location?: {
        village: string;
        state: string;
      };
      sowing_date: string;
      harvest_date: string;
      yield_quantity_kg: number;
      quality_check: string;
    };
    processing_details: Array<{
      process_type: string;
      output_form: { english: string; sanskrit: string };
      unit: {
        name: string;
        location: string;
      };
      equipment: string;
      operator: string;
      quality_check: string;
      timestamp: string;
    }>;
  }>;
}

const ResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { packageId } = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PackageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPackageData();
  }, [packageId]);

  const fetchPackageData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ApiService.getPackageDetails(packageId);
      if (result.error) {
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (err) {
      setError('Failed to fetch package details. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '-') return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    if (!status) return '#6c757d';
    const statusLower = status.toLowerCase();
    if (statusLower.includes('pass') || statusLower.includes('approved') || statusLower.includes('good')) {
      return '#28a745';
    } else if (statusLower.includes('fail') || statusLower.includes('rejected') || statusLower.includes('poor')) {
      return '#dc3545';
    } else {
      return '#ffc107';
    }
  };

  const StatusBadge = ({ status }: { status: string }) => (
    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) + '20' }]}>
      <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
        {status || 'Unknown'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2d6a4f" />
        <Text style={styles.loadingText}>Fetching package details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="warning" size={64} color="#dc3545" />
        <Text style={styles.errorTitle}>Error</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPackageData}>
          <Ionicons name="refresh" size={20} color="#fff" />
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.retryButton, styles.secondaryButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.retryButtonText, styles.secondaryButtonText]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="document" size={64} color="#6c757d" />
        <Text style={styles.errorTitle}>No Data Found</Text>
        <Text style={styles.errorText}>Package information not available.</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Package Details */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="cube" size={24} color="#2d6a4f" />
          <Text style={styles.cardTitle}>Package Details</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Package ID:</Text>
            <Text style={styles.detailValue}>{data.package_details.package_id}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Product:</Text>
            <Text style={styles.detailValue}>{data.package_details.product_name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Brand:</Text>
            <Text style={styles.detailValue}>{data.package_details.brand}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Packaging Type:</Text>
            <Text style={styles.detailValue}>
              {data.package_details.packaging_type.english} ({data.package_details.packaging_type.sanskrit})
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Packaged On:</Text>
            <Text style={styles.detailValue}>{formatDate(data.package_details.packaging_date)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Expiry Date:</Text>
            <Text style={styles.detailValue}>{formatDate(data.package_details.expiry_date)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantity:</Text>
            <Text style={styles.detailValue}>
              {data.package_details.quantity_units} {data.package_details.packaging_unit}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quality Check:</Text>
            <StatusBadge status={data.package_details.quality_check} />
          </View>
        </View>
      </View>

      {/* Retailer Details */}
      {data.retailer_details && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="storefront" size={24} color="#2d6a4f" />
            <Text style={styles.cardTitle}>Retailer Information</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Retailer:</Text>
              <Text style={styles.detailValue}>{data.retailer_details.retailer.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>License:</Text>
              <Text style={styles.detailValue}>{data.retailer_details.retailer.license}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailValue}>{data.retailer_details.retailer.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date Received:</Text>
              <Text style={styles.detailValue}>{formatDate(data.retailer_details.date_received)}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Ingredient Journey */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="leaf" size={24} color="#2d6a4f" />
          <Text style={styles.cardTitle}>Ingredient Journey</Text>
        </View>
        <View style={styles.cardContent}>
          {data.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <View style={styles.ingredientHeader}>
                <Ionicons name="nutrition" size={20} color="#52b788" />
                <Text style={styles.ingredientName}>
                  {ingredient.herb_details.herb_name || 'Unknown Herb'}
                </Text>
              </View>
              
              <View style={styles.ingredientDetails}>
                <Text style={styles.ingredientLabel}>Scientific Name:</Text>
                <Text style={styles.ingredientValue}>
                  {ingredient.herb_details.scientific_name || 'Not specified'}
                </Text>
              </View>
              
              <View style={styles.ingredientDetails}>
                <Text style={styles.ingredientLabel}>Form:</Text>
                <Text style={styles.ingredientValue}>
                  {ingredient.form.english} / {ingredient.form.sanskrit}
                </Text>
              </View>
              
              <View style={styles.ingredientDetails}>
                <Text style={styles.ingredientLabel}>Batch ID:</Text>
                <Text style={styles.ingredientValue}>{ingredient.batch_id}</Text>
              </View>

              {/* Farm Details */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="home" size={16} color="#40916c" />
                  <Text style={styles.sectionTitle}>Farm Origin</Text>
                </View>
                <View style={styles.sectionContent}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Farmer:</Text>
                    <Text style={styles.detailValue}>
                      {ingredient.farm_details.farmer?.name || 'Not specified'}
                    </Text>
                  </View>
                  {ingredient.farm_details.farmer?.certifications && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Certifications:</Text>
                      <View style={styles.certificationContainer}>
                        {ingredient.farm_details.farmer.certifications.map((cert, idx) => (
                          <View key={idx} style={styles.certificationBadge}>
                            <Text style={styles.certificationText}>{cert}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Location:</Text>
                    <Text style={styles.detailValue}>
                      {ingredient.farm_details.farm_location?.village || 'Not specified'}, {ingredient.farm_details.farm_location?.state || 'Not specified'}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Sowing Date:</Text>
                    <Text style={styles.detailValue}>{formatDate(ingredient.farm_details.sowing_date)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Harvest Date:</Text>
                    <Text style={styles.detailValue}>{formatDate(ingredient.farm_details.harvest_date)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Yield:</Text>
                    <Text style={styles.detailValue}>{ingredient.farm_details.yield_quantity_kg || 'Not specified'} kg</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Quality Check:</Text>
                    <StatusBadge status={ingredient.farm_details.quality_check} />
                  </View>
                </View>
              </View>

              {/* Processing Details */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="settings" size={16} color="#40916c" />
                  <Text style={styles.sectionTitle}>Processing Steps</Text>
                </View>
                <View style={styles.sectionContent}>
                  {ingredient.processing_details.map((process, pIndex) => (
                    <View key={pIndex} style={styles.processStep}>
                      <View style={styles.processHeader}>
                        <Text style={styles.processType}>{process.process_type}</Text>
                        <Text style={styles.processDate}>{formatDate(process.timestamp)}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Output Form:</Text>
                        <Text style={styles.detailValue}>
                          {process.output_form.english} ({process.output_form.sanskrit})
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Unit:</Text>
                        <Text style={styles.detailValue}>{process.unit.name}, {process.unit.location}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Equipment:</Text>
                        <Text style={styles.detailValue}>{process.equipment}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Operator:</Text>
                        <Text style={styles.detailValue}>{process.operator}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Quality Check:</Text>
                        <StatusBadge status={process.quality_check} />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Scanner')}
        >
          <Ionicons name="qr-code" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Scan Another</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryActionButton]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.actionButtonText, styles.secondaryActionButtonText]}>Back to Home</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fff9',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2d6a4f',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fff9',
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc3545',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d6a4f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#2d6a4f',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  ingredientContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8fff9',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#52b788',
  },
  ingredientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d6a4f',
    marginLeft: 8,
  },
  ingredientDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ingredientLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  ingredientValue: {
    fontSize: 13,
    color: '#2d6a4f',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  sectionContainer: {
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9f5f0',
    padding: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#40916c',
    marginLeft: 6,
  },
  sectionContent: {
    padding: 12,
  },
  certificationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 2,
    justifyContent: 'flex-end',
  },
  certificationBadge: {
    backgroundColor: '#d8f3dc',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    margin: 2,
  },
  certificationText: {
    fontSize: 10,
    color: '#2d6a4f',
    fontWeight: '500',
  },
  processStep: {
    backgroundColor: '#f8fff9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#74c69d',
  },
  processHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  processType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d6a4f',
  },
  processDate: {
    fontSize: 12,
    color: '#666',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    paddingBottom: 30,
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
  secondaryActionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2d6a4f',
  },
  secondaryActionButtonText: {
    color: '#2d6a4f',
    marginLeft: 0,
  },
});

export default ResultsScreen;