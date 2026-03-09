import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Scan() {

  const [image, setImage] = useState<string | null>(null);

  const openPicker = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1
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
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeImage = () => {

    router.push({
      pathname: "/result",
      params: {
        disease: "Blight Awal",
        confidence: 0.94
      }
    });

  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Ambil gambar tanaman</Text>

      <Text style={styles.subtitle}>
        Arahkan kamera ke bahagian daun atau batang yang sakit untuk diagnosis
      </Text>

      {/* Image Box */}
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

      {/* Buttons */}
      <View style={styles.row}>

        <TouchableOpacity style={styles.galleryBtn} onPress={openPicker}>
          <Ionicons name="images-outline" size={20} />
          <Text style={styles.btnText}>Galeri</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.analyzeBtn,
            { opacity: image ? 1 : 0.4 }
          ]}
          disabled={!image}
          onPress={analyzeImage}
        >
          <Text style={styles.analyzeText}>Analisis</Text>
        </TouchableOpacity>

      </View>
      {/* Guide */}
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
    padding: 20
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center"
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 6,
    marginBottom: 20
  },

  previewBox: {
    height: 230,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },

  placeholder: {
    alignItems: "center",
    justifyContent: "center"
  },

  previewImage: {
    width: "100%",
    height: "100%"
  },

  removeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 6
  },

  row: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between"
  },

  galleryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    padding: 14,
    borderRadius: 12,
    width: "48%",
    justifyContent: "center"
  },

  btnText: {
    marginLeft: 6
  },

  analyzeBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 12,
    width: "48%",
    alignItems: "center"
  },

  analyzeText: {
    color: "white",
    fontWeight: "600"
  },

    guide: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14
  },

  guideTitle: {
    fontWeight: "700",
    marginBottom: 8,
    color: "#2E7D32"
  },

  guideItem: {
    color: "#555",
    marginBottom: 4
  }

});

//   return (
//     <View style={styles.container}>

//       <Text style={styles.header}>Imbas Tanaman</Text>

//       <View style={styles.card}>

//         <Text style={styles.title}>Ambil gambar tanaman</Text>

//         <Text style={styles.subtitle}>
//           Arahkan kamera ke bahagian daun atau batang yang sakit untuk diagnosis
//         </Text>

//         {/* Preview */}
//         <View style={styles.previewContainer}>

//           {image ? (
//             <Image source={{ uri: image }} style={styles.preview} />
//           ) : (
//             <CameraView style={styles.preview} ref={cameraRef} />
//           )}

//           <View style={styles.cameraOverlay}>
//             <Ionicons name="camera-outline" size={28} color="white" />
//           </View>

//         </View>

//         {/* Buttons */}
//         <View style={styles.buttonRow}>

//           <TouchableOpacity style={styles.galleryBtn} onPress={pickImage}>
//             <Ionicons name="images-outline" size={20} color="#444" />
//             <Text style={styles.galleryText}>Galeri</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
//             <Ionicons name="camera-outline" size={20} color="white" />
//             <Text style={styles.cameraText}>Kamera</Text>
//           </TouchableOpacity>

//         </View>

//         {/* Guide */}
//         <View style={styles.guide}>

//           <Text style={styles.guideTitle}>Panduan Penggunaan</Text>

//           <Text style={styles.guideItem}>1  Pastikan daun padi jelas dalam gambar.</Text>
//           <Text style={styles.guideItem}>2  Gunakan cahaya yang mencukupi.</Text>
//           <Text style={styles.guideItem}>3  Fokus pada bahagian yang rosak.</Text>

//         </View>

//       </View>

//     </View>
//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: "#F3F4F6",
//     padding: 20
//   },

//   header: {
//     fontSize: 20,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 20
//   },

//   card: {
//     backgroundColor: "white",
//     borderRadius: 18,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 3
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     textAlign: "center"
//   },

//   subtitle: {
//     textAlign: "center",
//     color: "#666",
//     marginTop: 6,
//     marginBottom: 18
//   },

//   previewContainer: {
//     height: 230,
//     borderRadius: 14,
//     overflow: "hidden",
//     marginBottom: 18
//   },

//   preview: {
//     width: "100%",
//     height: "100%"
//   },

//   cameraOverlay: {
//     position: "absolute",
//     alignSelf: "center",
//     top: "40%",
//     backgroundColor: "rgba(0,0,0,0.3)",
//     padding: 16,
//     borderRadius: 50
//   },

//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20
//   },

//   galleryBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E5E7EB",
//     padding: 14,
//     borderRadius: 12,
//     width: "48%",
//     justifyContent: "center"
//   },

//   galleryText: {
//     marginLeft: 6,
//     fontWeight: "600"
//   },

//   cameraBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4CAF50",
//     padding: 14,
//     borderRadius: 12,
//     width: "48%",
//     justifyContent: "center"
//   },

//   cameraText: {
//     marginLeft: 6,
//     color: "white",
//     fontWeight: "600"
//   },



// });