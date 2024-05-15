import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from "react-native";

const HelpDesk = () => {
  const [faqData, setFaqData] = useState([
    {
      question: "What is Swyftbags?",
      answer:
        "Swyftbags is a peer-to-peer (P2P) platform that allows travelers with unused luggage space to transport items for others, providing a cost-effective alternative to traditional courier services.",
      isOpen: false,
    },
    {
      question: "How can I use Swyftbags to send or provide space for an item?",
      answer:
        "You need to register and post your items details, including destination and size, Travelers heading towards your items destination can then offer to carry it for you.",
      isOpen: false,
    },
    {
      question: "How can a traveller use it?",
      answer:
        "Travellers will register to the app and post a trip and the amount of free space they can leverage",
      isOpen: false,
    },
    {
      question: "Can I cancel my transaction??",
      answer:
        "Yes, you can cancel a transaction yourself but if the payment is made and you encounter an error continuing the trip your amount can will be refunded to your wallet.",
      isOpen: false,
    },
    {
      question: "What items are forbidden to send through Swyftbags?",
      answer:
        "To ensure the safety and legality of our services, Swyftbags prohibits the transportation of certain items. These include illegal substances, explosives and flammable materials, weapons, perishable goods and sensitive or valuable artifacts ",
      isOpen: false,
    },

    // Add more FAQs here
  ]);

  const toggleFAQ = (index) => {
    setFaqData(
      faqData.map((faq, i) => {
        if (i === index) {
          faq.isOpen = !faq.isOpen;
        } else {
          faq.isOpen = false;
        }
        return faq;
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FAQs</Text>
      </View>

      <ScrollView style={styles.content}>
        {faqData.map((faq, index) => (
          <View key={index} style={styles.box}>
            <TouchableOpacity
              style={styles.faqTitleContainer}
              onPress={() => toggleFAQ(index)}
            >
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Image
                source={require("../assets/Dashboard/chevron.png")}
                style={faq.isOpen ? styles.chevronOpen : styles.chevron}
              />
            </TouchableOpacity>
            {faq.isOpen && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
            <View style={styles.divider} />
          </View>
        ))}
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
    alignItems: "center", // This will align items along the cross axis (horizontally, since the flex direction is column by default).
    justifyContent: "center", // This centers the content vertically within the header.
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 20,
  },
  faqTitleContainer: {
    paddingVertical: 15,
    backgroundColor: "#4DB6AC",
    padding: 10,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  faqQuestion: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#4DB6AC",
  },
  faqAnswer: {
    fontSize: 16,
    color: "#fff",
    paddingVertical: 10,
    backgroundColor: "#4DB6AC",
  },
  divider: {
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  chevron: {
    width: 20,
    height: 20,
    transform: [{ rotate: "0deg" }],
  },
  chevronOpen: {
    width: 20,
    height: 20,
    transform: [{ rotate: "180deg" }],
  },
});

export default HelpDesk;
