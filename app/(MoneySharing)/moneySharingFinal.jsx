import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function MoneySharingFinal() {
  const router = useRouter();
  const { updatedCategories } = useLocalSearchParams();
  const [parsedCategories, setParsedCategories] = useState([]);
  const [totalPayments, setTotalPayments] = useState({});

  useEffect(() => {
    try {
      if (updatedCategories) {
        const parsed = JSON.parse(updatedCategories);
        setParsedCategories(parsed);
      }
    } catch (error) {
      console.error('Error parsing categories:', error);
    }
  }, [updatedCategories]);

  useEffect(() => {
    if (parsedCategories.length > 0) {
      const payments = {}; // Store final payments
      
      parsedCategories.forEach((category) => {
        const totalValue = parseFloat(category.value);
        const participants = category.participants.map((p) => p.name);
        const payers = category.payers.map((p) => p.name);
  
        const perParticipantCost = totalValue / participants.length;
        const perPayerContribution = totalValue / payers.length;
  
        const balances = {}; // Track each person's net balance
        participants.forEach((participant) => {
          balances[participant] = (balances[participant] || 0) - perParticipantCost;
        });
  
        payers.forEach((payer) => {
          balances[payer] = (balances[payer] || 0) + perPayerContribution;
        });
  
        // Calculate payments
        participants.forEach((participant) => {
          if (balances[participant] < 0) {
            payers.forEach((payer) => {
              if (balances[payer] > 0) {
                const transfer = Math.min(-balances[participant], balances[payer]);
                const key = `${participant}->${payer}`;
                payments[key] = (payments[key] || 0) + transfer;
  
                balances[participant] += transfer;
                balances[payer] -= transfer;
              }
            });
          }
        });
      });
  
      // Consolidate payments to handle mutual debts
      const consolidatedPayments = {};
      Object.entries(payments).forEach(([key, value]) => {
        const [from, to] = key.split('->');
        const reverseKey = `${to}->${from}`;
        if (consolidatedPayments[reverseKey]) {
          consolidatedPayments[reverseKey] -= value;
          if (Math.abs(consolidatedPayments[reverseKey]) < 1e-2) {
            delete consolidatedPayments[reverseKey];
          }
        } else {
          consolidatedPayments[key] = value;
        }
      });
  
      // Remove near-zero payments
      const filteredPayments = Object.fromEntries(
        Object.entries(consolidatedPayments).filter(([_, value]) => Math.abs(value) > 1e-2)
      );
  
      setTotalPayments(filteredPayments);
    }
  }, [parsedCategories]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.firstHeaderContainer}>
        <View style={styles.userNameBox}>
          <View style={styles.imageBox}>
            <Image source={require('../../assets/images/character.png')} style={styles.userImage} />
          </View>
          <Text style={styles.userName}>Doan Le Vy</Text>
        </View>

        <View style={styles.notificationButton}>
          <Feather name="bell" size={30} color="black" />
        </View>
      </View>

      <Text style={styles.firstTitle}>Phân chia chi phí</Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Activities</Text>
          <Text style={styles.tableHeaderCell}>Value</Text>
          <Text style={styles.tableHeaderCell}>Details</Text>
        </View>

        {parsedCategories.map((category, index) => {
          const totalValue = parseFloat(category.value);
          const participants = category.participants.map((p) => p.name);
          const payers = category.payers.map((p) => p.name);

          const perParticipantCost = (totalValue / participants.length).toFixed(0);
          const perPayerContribution = (totalValue / payers.length).toFixed(0);

          return (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{category.name}</Text>
              <Text style={styles.tableCell}>{category.value}</Text>
              <Text style={styles.tableCell}>
                Mỗi người tham gia trả: {perParticipantCost}, mỗi người ứng: {perPayerContribution}
              </Text>
            </View>
          );
        })}

        <Text style={styles.total}>
          Total:{' '}
          {Object.entries(totalPayments).map(([key, value]) => {
            const [from, to] = key.split('->');
            if (value < 0) {
              // Reverse the transaction
              return (
                <Text key={key}>
                  {to} needs to pay {from} {Math.abs(value).toFixed(0)}{'\n'}
                </Text>
              );
            }
            return (
              <Text key={key}>
                {from} needs to pay {to} {value.toFixed(0)}{'\n'}
              </Text>
            );
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  returnButton: {
    marginBottom: 20,
  },
  firstHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userNameBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBox: {
    marginRight: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 10,
  },
  firstTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tableCell: {
    flex: 1,
  },
  total: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
