import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Result() {
  const { advice } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Hasil Diagnosis 🌿</Text>

      <View style={styles.card}>
        <Text style={styles.advice}>{advice}</Text>
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Imbas Semula</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  advice: {
    fontSize: 15,
    lineHeight: 26,
    color: "#333",
  },
  backBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  backText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});