import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Result() {

  const {
    disease,
    confidence,
    treatment,
    prevention,
    image
  } = useLocalSearchParams();
const confidenceNumber = Number(confidence) || 0;
const treatments: string[] = treatment ? JSON.parse(treatment as string) : [];
const preventions: string[] = prevention ? JSON.parse(prevention as string) : [];

const img =
  typeof image === "string"
    ? image
    : "https://images.unsplash.com/photo-1471193945509-9ad0617afabf";

  return (
    <ScrollView style={styles.container}>

      {/* Image */}
      <Image source={{ uri: img }} style={styles.image} />

      {/* Diagnosis */}
      <View style={styles.diagnosisCard}>

        <View style={styles.diagnosisRow}>

          <View style={styles.iconBox}>
            <Ionicons name="alert-circle-outline" size={24} color="#C2410C" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Penyakit Dikesan</Text>

            <Text style={styles.disease}>{disease}</Text>

            <Text style={styles.confidence}>
              Keyakinan AI:
              <Text style={{ fontWeight: "700" }}> {confidenceNumber}%</Text>
            </Text>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${confidenceNumber}%` }
                ]}
              />
            </View>

          </View>

        </View>

      </View>

      {/* Learning */}
      <TouchableOpacity style={styles.learnCard}>

        <Ionicons name="school-outline" size={26} color="#1F3D2B" />

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.learnTitle}>
            Belajar Kenapa Ini Berlaku
          </Text>

          <Text style={styles.learnSub}>
            Pembelajaran ringkas 2 minit
          </Text>
        </View>

      </TouchableOpacity>

      {/* Treatment Section */}
      <Text style={styles.sectionTitle}>Rawatan Disyorkan</Text>

      {treatments.map((item, index) => (
        <View key={index} style={styles.treatmentCard}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#166534" />
          <View style={styles.treatmentText}>
            <Text style={styles.stepTitle}>{index + 1}. {item}</Text>
          </View>
        </View>
      ))}

      {/* Prevention */}
      <Text style={styles.sectionTitle}>Pencegahan</Text>

      <View style={styles.preventionCard}>
        {preventions.map((item, index) => (
          <Text key={index} style={styles.bullet}>
            • {item}
          </Text>
        ))}
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.scanAgain}
        onPress={() => router.push("/scan")}
      >
        <Text style={styles.scanText}>Imbas Tanaman Lain</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.readMore}>
        <Text style={styles.readText}>Baca Panduan Lengkap</Text>
      </TouchableOpacity>


    </ScrollView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 18,
    marginBottom: 16
  },

  diagnosisCard: {
    backgroundColor: "#FDECEC",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16
  },

  diagnosisRow: {
    flexDirection: "row"
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#FECACA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },

  label: {
    color: "#C2410C",
    fontWeight: "700"
  },

  disease: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 2
  },

  confidence: {
    marginTop: 8
  },

  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    marginTop: 4
  },

  progressFill: {
    height: 6,
    backgroundColor: "#166534",
    borderRadius: 6
  },

  learnCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9A874",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16
  },

  learnTitle: {
    fontWeight: "700",
    fontSize: 16
  },

  learnSub: {
    color: "#374151",
    fontSize: 12
  },

  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10
  },

  treatmentCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#166534"
  },

  treatmentText: {
    marginLeft: 10,
    flex: 1
  },

  stepTitle: {
    fontWeight: "700"
  },

  stepDesc: {
    color: "#374151",
    fontSize: 13
  },

  preventionCard: {
    backgroundColor: "#F5F1E8",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20
  },

  bullet: {
    marginBottom: 6,
    color: "#374151"
  },

  scanAgain: {
    backgroundColor: "#4B7F3A",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10
  },

  scanText: {
    color: "white",
    fontWeight: "700"
  },

  readMore: {
    backgroundColor: "#8B6B4B",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 30
  },

  readText: {
    color: "white",
    fontWeight: "700"
  }

});