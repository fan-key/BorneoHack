import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const historyData = [
  {
    id: 1,
    title: "Hawar Daun Bakteri",
    crop: "Padi",
    date: "12 Okt 2023",
    level: "TINGGI",
    image: "https://images.unsplash.com/photo-1598514982841-646c36e9c2a0"
  },
  {
    id: 2,
    title: "Karat Jagung",
    crop: "Jagung",
    date: "08 Okt 2023",
    level: "SEDERHANA",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
  },
  {
    id: 3,
    title: "Sihat (Tiada Penyakit)",
    crop: "Cili",
    date: "05 Okt 2023",
    level: "RENDAH",
    image: "https://images.unsplash.com/photo-1561136594-7f68413baa99"
  }
];

export default function History() {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Sejarah Imbasan</Text>

      {historyData.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/history-detail",
              params: { title: item.title }
            })
          }
        >

          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {item.crop} • {item.date}
            </Text>

            <Text style={styles.link}>Lihat Rawatan ></Text>
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
  }

});