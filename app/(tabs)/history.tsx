import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";




export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await AsyncStorage.getItem("scanHistory");
      console.log("HISTORY DATA:", data);
      const savedHistory = data ? JSON.parse(data) : [];
      if (data) {
        setHistory([...savedHistory]);
      }
    };

    loadHistory();
  }, []);
  const deleteHistory = async () => {
    try {
      await AsyncStorage.removeItem("scanHistory");
      // reset to dummy data only
      setHistory([]);
    } catch (err) {
      console.log("Failed to clear history:", err);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Sejarah Imbasan</Text>

        <TouchableOpacity style={styles.deleteBtn} onPress={deleteHistory}>
          <Ionicons name="trash-outline" size={18} color="white" />
          <Text style={styles.deleteText}>Padam</Text>
        </TouchableOpacity>
      </View>
      {history.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/result",
              params: {
                disease: item.disease,
                confidence: item.confidence,
                treatment: JSON.stringify(item.treatment),
                prevention: JSON.stringify(item.prevention),
                image: item.image,
              }
            })
          }
        >

          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.disease}</Text>

            <Text style={styles.subtitle}>
              {new Date(item.date).toLocaleDateString()}
            </Text>

            <Text style={styles.link}>Lihat Rawatan </Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.level}</Text>
          </View>

        </TouchableOpacity>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    alignItems: "center"
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12
  },

  cardTitle: {
    fontWeight: "700",
    fontSize: 16
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginVertical: 4
  },

  link: {
    color: "#16A34A",
    fontWeight: "600",
    fontSize: 13
  },

  badge: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10
  },

  badgeText: {
    color: "#DC2626",
    fontWeight: "700",
    fontSize: 11
  },
    headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DC2626",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10
  },

  deleteText: {
    color: "white",
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 13
  }

});