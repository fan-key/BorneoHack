import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Profile() {

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profil Petani</Text>

        <TouchableOpacity>
          <Ionicons name="pencil-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>


      {/* Avatar */}
      <View style={styles.profileSection}>

        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150" }}
            style={styles.avatar}
          />

          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark" size={12} color="white" />
          </View>
        </View>

        <Text style={styles.name}>Ahmad Zaki bin Yusof</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#6B7280" />
          <Text style={styles.location}>Banting, Selangor</Text>
        </View>

        <View style={styles.farmerId}>
          <Text style={styles.farmerIdText}>FARMER ID: TG-8821</Text>
        </View>

      </View>


      {/* Farm Info */}
      <View style={styles.infoRow}>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>TANAMAN UTAMA</Text>
          <Text style={styles.infoValue}>Durian Musang King</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>LUAS LADANG</Text>
          <Text style={styles.infoValue}>15.5 Ekar</Text>
        </View>

      </View>


      {/* Settings */}
      <Text style={styles.sectionTitle}>TETAPAN LADANG</Text>

      <View style={styles.settingsCard}>

        <SettingItem
          icon="notifications-outline"
          title="Notifikasi & Amaran"
        />

        <SettingItem
          icon="globe-outline"
          title="Bahasa"
          subtitle="Bahasa Melayu (BM)"
        />

        <SettingItem
          icon="scale-outline"
          title="Unit Ukuran"
          subtitle="Metrik (m, kg, °C)"
        />

        <SettingItem
          icon="leaf-outline"
          title="Tukar Tanaman Utama"
        />

      </View>


      <View style={styles.settingsCard}>

        <SettingItem
          icon="help-circle-outline"
          title="Pusat Bantuan"
        />

        <SettingItem
          icon="shield-checkmark-outline"
          title="Privasi & Polisi"
        />

      </View>


      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={18} color="#DC2626" />
        <Text style={styles.logoutText}>Log Keluar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}



function SettingItem({ icon, title, subtitle }: any) {
  return (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={20} color="#16A34A" />

        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 18
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700"
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 20
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 10
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },

  verifiedBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#22C55E",
    borderRadius: 10,
    padding: 4
  },

  name: {
    fontSize: 20,
    fontWeight: "700"
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4
  },

  location: {
    marginLeft: 4,
    color: "#6B7280"
  },

  farmerId: {
    marginTop: 8,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },

  farmerIdText: {
    color: "#16A34A",
    fontWeight: "600",
    fontSize: 12
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },

  infoCard: {
    backgroundColor: "#E5E7EB",
    padding: 16,
    borderRadius: 14,
    width: "48%"
  },

  infoLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 4
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16A34A"
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 10,
    color: "#6B7280"
  },

  settingsCard: {
    backgroundColor: "white",
    borderRadius: 14,
    marginBottom: 16
  },

  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6"
  },

  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  settingTitle: {
    fontWeight: "600"
  },

  settingSubtitle: {
    fontSize: 12,
    color: "#6B7280"
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    padding: 14,
    borderRadius: 14
  },

  logoutText: {
    color: "#DC2626",
    marginLeft: 6,
    fontWeight: "600"
  }

});