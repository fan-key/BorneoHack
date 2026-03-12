import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BACKEND_URL = "http://172.20.10.3:3000";

export default function Scan() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const openPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.2,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission required");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.2,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      let rawText = '';

      try {
        const response = await fetch(`${BACKEND_URL}/api/diagnose`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "bypass-tunnel-reminder": "true",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ base64Image: base64 }),
        });

        rawText = await response.text();
        console.log('STATUS:', response.status);
        console.log('RAW:', rawText.substring(0, 200));

        const data = JSON.parse(rawText);

        if (!data.success) {
          alert(data.message || "Ralat berlaku. Sila cuba lagi.");
          return;
        }

        router.push({
          pathname: "/result",
          params: { advice: data.data.advice },
        });

      } catch (parseError) {
        console.error('Parse error, raw was:', rawText.substring(0, 500));
        alert("Server error: " + rawText.substring(0, 200));
      }

    }  catch (error: any) {
    alert("Error: " + error.message);
    console.error(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Ambil gambar tanaman</Text>

      <Text style={styles.subtitle}>
        Arahkan kamera ke bahagian daun atau batang yang sakit untuk diagnosis
      </Text>

      <TouchableOpacity style={styles.previewBox} onPress={openCamera}>
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.previewImage} />
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => setImage(null)}
            >
              <Ionicons name="close" size={18} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="camera-outline" size={32} color="#666" />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity style={styles.galleryBtn} onPress={openPicker}>
          <Ionicons name="images-outline" size={20} />
          <Text style={styles.btnText}>Galeri</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.analyzeBtn, { opacity: image && !loading ? 1 : 0.4 }]}
          disabled={!image || loading}
          onPress={analyzeImage}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.analyzeText}>Analisis</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.guide}>
        <Text style={styles.guideTitle}>Panduan Penggunaan</Text>
        <Text style={styles.guideItem}>1  Pastikan daun padi jelas dalam gambar.</Text>
        <Text style={styles.guideItem}>2  Gunakan cahaya yang mencukupi.</Text>
        <Text style={styles.guideItem}>3  Fokus pada bahagian yang rosak.</Text>
      </View>

    </View>
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
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 6,
    marginBottom: 20,
  },
  previewBox: {
    height: 230,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  removeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 6,
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  galleryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    padding: 14,
    borderRadius: 12,
    width: "48%",
    justifyContent: "center",
  },
  btnText: {
    marginLeft: 6,
  },
  analyzeBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
  },
  analyzeText: {
    color: "white",
    fontWeight: "600",
  },
  guide: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
  },
  guideTitle: {
    fontWeight: "700",
    marginBottom: 8,
    color: "#2E7D32",
  },
  guideItem: {
    color: "#555",
    marginBottom: 4,
  },
});