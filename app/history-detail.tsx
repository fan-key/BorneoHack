import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function HistoryDetail() {

  const { title } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.pageTitle}>Gambar Tanaman</Text>

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf"
        }}
        style={styles.image}
      />

      <View style={styles.resultCard}>

        <View style={styles.headerRow}>
          <Text style={styles.resultLabel}>HASIL DETEKSI</Text>
          <Text style={styles.accuracy}>Akurasi 98%</Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.scientific}>
          Xanthomonas oryzae pv. oryzae
        </Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Tentang Penyakit</Text>

        <Text style={styles.paragraph}>
          Penyakit ini menyerang tanaman padi pada semua fase
          pertumbuhan. Gejalanya berupa garis-garis kuning
          kecokelatan pada helaian daun.
        </Text>

        <View style={styles.treatmentBox}>

          <Text style={styles.sectionTitle}>Saran Penanganan</Text>

          <Text style={styles.paragraph}>
            • Gunakan varietas tahan{"\n"}
            • Atur jarak tanam dengan sistem legowo{"\n"}
            • Pemupukan nitrogen secara proporsional
          </Text>

        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16
  },

  pageTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10
  },

  image: {
    width: "100%",
    height: 230,
    borderRadius: 16,
    marginBottom: 20
  },

  resultCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },

  resultLabel: {
    color: "#16A34A",
    fontWeight: "700"
  },

  accuracy: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    color: "#16A34A"
  },

  title: {
    fontSize: 22,
    fontWeight: "700"
  },

  scientific: {
    color: "#6B7280",
    marginBottom: 14
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 6
  },

  paragraph: {
    color: "#374151",
    lineHeight: 20
  },

  treatmentBox: {
    backgroundColor: "#ECFDF5",
    padding: 14,
    borderRadius: 12,
    marginTop: 14
  }

});