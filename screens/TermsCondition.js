import React from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native';

const TermsCondition = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Terms and Conditions</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>1. Introduction </Text>
        <Text style={styles.paragraph}>
          By registering or using the Swyftbags platform, you agree to be bound by these terms and conditions. Ensure you understand them fully before using our services.
        </Text>

        <Text style={styles.sectionTitle}>2. Using Swyftbags</Text>
        <Text style={styles.paragraph}>
          Swyftbags allows users to send and transport items via the unused luggage space of travelers. Users must provide accurate and up-to-date personal information and are responsible for maintaining the confidentiality of their account.
        </Text>

        <Text style={styles.sectionTitle}>3. Prohibitions</Text>
        <Text style={styles.paragraph}>
          You may not use Swyftbags for the transport of illegal substances, explosives, weapons, or any goods that are inherently dangerous. It is also prohibited to send perishable goods or sensitive or valuable artifacts through our platform.
        </Text>

        <Text style={styles.sectionTitle}>4. Payments and Cancellations</Text>
        <Text style={styles.paragraph}>
          Payments must be made through the provided payment methods on Swyftbags. If a trip is canceled after a payment has been made, refunds will be processed according to our refund policy.
        </Text>

       
        <Text style={styles.sectionTitle}>5. Liability</Text>
        <Text style={styles.paragraph}>
          Incase of any loss, damage, or legal implications that occur due to the transportation of items. Users will be dealt by our team according to the severity of their case.
        </Text>
        

        <Text style={styles.sectionTitle}>6. Amendments</Text>
        <Text style={styles.paragraph}>
          We reserve the right to update or change our terms and conditions at any time. Such changes will be effective immediately upon posting on our platform. Continued use of our services after any such changes shall constitute your consent to such changes.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: "5%",
    paddingTop: "8%",
    paddingBottom: "2%",
    backgroundColor: "#4DB6AC",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4DB6AC",
    marginTop: 10,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 14,
    color: "#666",
    marginBottom: '10%',
  },
});

export default TermsCondition;
