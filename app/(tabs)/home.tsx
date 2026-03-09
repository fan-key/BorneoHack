import { Image } from 'expo-image';
import { View,Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>

      {/* Greeting */}
      <View style={styles.greetingRow}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.greeting}>Selamat Pagi, Ahmad!</Text>
          <Text style={styles.weather}>☁️ 28°C, Hujan Ringan</Text>
        </View>

        <TouchableOpacity style={styles.settings}
          onPress={() => router.push("/profile")}>
          
          <Ionicons name="settings-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Farm Status Card */}
      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status Semasa</Text>
        <Text style={styles.statusTitle}>Hari ke-45: Padi</Text>
        <Text style={styles.statusSub}>Musim Tanam A • Fasa Berbunga</Text>
      </View>

      {/* Main Action */}
      <Text style={styles.sectionTitle}>Aksi Utama</Text>

      <TouchableOpacity
        style={styles.scanCard}
        onPress={() => router.push("/scan")}
      >
        <View style={styles.scanIcon}>
          <Ionicons name="camera-outline" size={28} color="white" />
        </View>

        <Text style={styles.scanTitle}>Pengesan Perosak</Text>
        <Text style={styles.scanSub}>
          Imbas tanaman untuk mengesan masalah
        </Text>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.quickRow}>

        <TouchableOpacity style={styles.quickCard}
          onPress={() => router.push("/voice")}
        >
          <MaterialCommunityIcons name="microphone-outline" size={22} color="#F59E0B" />
          <Text style={styles.quickText}>Tanya AI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard}
          onPress={() => router.push("/library")}
        >
          <Ionicons name="book-outline" size={22} color="#22C55E" />
          <Text style={styles.quickText}>Panduan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickCard}
          onPress={() => router.push("/history")}
        >
          <Ionicons name="time-outline" size={22} color="#3B82F6" />
          <Text style={styles.quickText}>Sejarah</Text>
        </TouchableOpacity>

      </View>

      {/* AI Tips */}
      <Text style={styles.sectionTitle}>Tip AI TaniGrow</Text>

      <View style={styles.tipCard}>
        <View style={styles.tipIcon}>
          <Ionicons name="sparkles-outline" size={18} color="#22C55E" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.tipTitle}>Tip Pengairan</Text>
          <Text style={styles.tipText}>
            Siram tanaman pada awal pagi untuk mengelakkan kulat dan memastikan
            penyerapan air lebih baik.
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
    padding: 18
  },

  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DDD",
    marginRight: 10
  },

  greeting: {
    fontSize: 16,
    fontWeight: "700"
  },

  weather: {
    fontSize: 13,
    color: "#666"
  },

  settings: {
    marginLeft: "auto"
  },

  statusCard: {
    backgroundColor: "#4CAF50",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20
  },

  statusLabel: {
    color: "#E8F5E9",
    fontSize: 12
  },

  statusTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 4
  },

  statusSub: {
    color: "#E8F5E9"
  },

  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10
  },

  scanCard: {
    backgroundColor: "#E53935",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    marginBottom: 20
  },

  scanIcon: {
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: 40,
    padding: 12,
    marginBottom: 8
  },

  scanTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700"
  },

  scanSub: {
    color: "#FFEAEA",
    fontSize: 12,
    marginTop: 4
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },

  quickCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    width: "30%",
    elevation: 2
  },

  quickText: {
    marginTop: 6,
    fontSize: 12
  },

  tipCard: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "flex-start"
  },

  tipIcon: {
    backgroundColor: "#DCFCE7",
    padding: 8,
    borderRadius: 10,
    marginRight: 10
  },

  tipTitle: {
    fontWeight: "700",
    color: "#166534"
  },

  tipText: {
    fontSize: 13,
    color: "#333",
    marginTop: 2
  }

});