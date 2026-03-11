import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// ── Types ─────────────────────────────────────────────────────────────────────
type VoiceState = "idle" | "listening" | "thinking" | "speaking";

type AIStep = {
  number: number;
  text: string;
  loading?: boolean;
};

// ── FAQ suggestions ───────────────────────────────────────────────────────────
const FAQS = [
  "Bagaimana cara mengatasi ulat?",
  "Bila waktu sesuai membaja?",
  "Kenapa daun pokok cili saya kuning?",
  "Cara buat kompos organik sendiri?",
];

// ── Fake AI responses ─────────────────────────────────────────────────────────
const AI_RESPONSES: Record<string, AIStep[]> = {
  default: [
    { number: 1, text: "Periksa tanaman anda setiap pagi untuk tanda-tanda awal penyakit." },
    { number: 2, text: "Pastikan saliran tanah baik supaya air tidak bertakung." },
    { number: 3, text: "Gunakan baja organik sekali sebulan untuk hasil yang lebih baik." },
  ],
  ulat: [
    { number: 1, text: "Kutip ulat secara manual pada waktu pagi atau petang." },
    { number: 2, text: "Semburkan larutan sabun cair dicampur air pada daun yang diserang." },
    { number: 3, text: "Tanam pokok bunga seperti marigold sebagai pengusir semula jadi." },
  ],
  baja: [
    { number: 1, text: "Masa terbaik adalah pada fasa anak benih (14–21 hari selepas tanam)." },
    { number: 2, text: "Gunakan NPK 15-15-15 sebagai baja asas pada kadar 60 kg/hektar." },
    { number: 3, text: "Baja semula pada fasa anakan aktif (35–45 hari) untuk hasil optima." },
  ],
  kuning: [
    { number: 1, text: "Daun kuning biasanya disebabkan kekurangan nitrogen atau besi." },
    { number: 2, text: "Uji pH tanah — nilai ideal ialah antara 6.0 hingga 7.0." },
    { number: 3, text: "Gunakan baja urea 60–80 kg/hektar dan semak semula selepas 2 minggu." },
  ],
  kompos: [
    { number: 1, text: "Kumpulkan sisa dapur (sayur, buah) dan sisa kebun ke dalam tong." },
    { number: 2, text: "Campur bahan hijau (nitrogen) dan bahan coklat (karbon) sama banyak." },
    { number: 3, text: "Kacau campuran setiap 3–4 hari. Kompos sedia dalam 6–8 minggu." },
  ],
};

function getAISteps(input: string): AIStep[] {
  const l = input.toLowerCase();
  if (l.includes("ulat")) return AI_RESPONSES.ulat;
  if (l.includes("baja")) return AI_RESPONSES.baja;
  if (l.includes("kuning")) return AI_RESPONSES.kuning;
  if (l.includes("kompos")) return AI_RESPONSES.kompos;
  return AI_RESPONSES.default;
}

// ── Pulse rings ───────────────────────────────────────────────────────────────
function PulseRings({ active }: { active: boolean }) {
  const rings = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

  useEffect(() => {
    if (!active) { rings.forEach(r => r.setValue(0)); return; }
    const anims = rings.map((r, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 500),
          Animated.timing(r, { toValue: 1, duration: 1800, easing: Easing.out(Easing.ease), useNativeDriver: true }),
          Animated.timing(r, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])
      )
    );
    anims.forEach(a => a.start());
    return () => anims.forEach(a => a.stop());
  }, [active]);

  return (
    <>
      {rings.map((r, i) => (
        <Animated.View
          key={i}
          style={{
            position: "absolute",
            width: 110,
            height: 110,
            borderRadius: 55,
            backgroundColor: "#4CAF50",
            opacity: r.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 0.22, 0] }),
            transform: [{ scale: r.interpolate({ inputRange: [0, 1], outputRange: [1, 2.4] }) }],
          }}
        />
      ))}
    </>
  );
}

// ── Bouncing dots ─────────────────────────────────────────────────────────────
function BounceDot({ delay }: { delay: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: -5, duration: 280, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 280, useNativeDriver: true }),
        Animated.delay(500),
      ])
    ).start();
  }, []);
  return (
    <Animated.View
      style={{
        width: 7, height: 7, borderRadius: 4,
        backgroundColor: "#4CAF50",
        marginHorizontal: 2,
        transform: [{ translateY: anim }],
      }}
    />
  );
}

// ── Animated step row ─────────────────────────────────────────────────────────
function StepRow({ step, animate }: { step: AIStep; animate?: boolean }) {
  const opacity = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const translateY = useRef(new Animated.Value(animate ? 8 : 0)).current;

  useEffect(() => {
    if (!animate) return;
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.stepRow, { opacity, transform: [{ translateY }] }]}>
      <View style={styles.stepBadge}>
        <Text style={styles.stepBadgeText}>{step.number}</Text>
      </View>
      <Text style={styles.stepText}>{step.text}</Text>
    </Animated.View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function Voice() {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [steps, setSteps] = useState<AIStep[]>([
    { number: 1, text: "Sila tanya soalan untuk melihat langkah penyelesaian..." },
    { number: 2, text: "", loading: true },
  ]);
  const [hasAnswer, setHasAnswer] = useState(false);
  const micScale = useRef(new Animated.Value(1)).current;
  const isActive = voiceState === "listening" || voiceState === "speaking";

  const animateMic = (toValue: number) =>
    Animated.spring(micScale, { toValue, useNativeDriver: true, friction: 5 }).start();

  const ask = (question: string) => {
    setVoiceState("thinking");
    setHasAnswer(false);
    setSteps([
      { number: 1, text: "Sedang menganalisis soalan anda..." },
      { number: 2, text: "", loading: true },
    ]);

    // Replace this timeout with a real Claude / OpenAI / Gemini API call
    setTimeout(() => {
      const result = getAISteps(question);
      setSteps(result);
      setHasAnswer(true);
      setVoiceState("speaking");
      setTimeout(() => setVoiceState("idle"), 2500);
    }, 1800);
  };

  const handleMicPress = () => {
    if (voiceState !== "idle") return;
    setVoiceState("listening");

    // Replace this timeout with real expo-av / Whisper STT integration
    setTimeout(() => {
      const samples = FAQS;
      ask(samples[Math.floor(Math.random() * samples.length)]);
    }, 2500);
  };

  const stateLabel: Record<VoiceState, string> = {
    idle: "Tekan untuk bercakap",
    listening: "Sedang mendengar...",
    thinking: "Sedang berfikir...",
    speaking: "Tekan untuk bercakap",
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >

        {/* ── Title ── */}
        <Text style={styles.title}>Tanya saya apa-apa tentang{"\n"}tanaman anda</Text>

        {/* ── Mic button ── */}
        <View style={styles.micArea}>
          <PulseRings active={isActive} />
          <Animated.View style={{ transform: [{ scale: micScale }] }}>
            <TouchableOpacity
              style={[styles.micBtn, voiceState === "listening" && styles.micBtnListening]}
              onPressIn={() => animateMic(0.93)}
              onPressOut={() => animateMic(1)}
              onPress={handleMicPress}
              disabled={voiceState === "thinking"}
              activeOpacity={0.9}
            >
              {voiceState === "thinking" ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <BounceDot delay={0} />
                  <BounceDot delay={160} />
                  <BounceDot delay={320} />
                </View>
              ) : (
                <Ionicons name="mic" size={38} color="white" />
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* ── State label ── */}
        <Text style={styles.stateLabel}>{stateLabel[voiceState]}</Text>

        {/* ── AI Answer card ── */}
        <View style={styles.answerCard}>
          <View style={styles.answerHeader}>
            <View style={styles.answerIconWrap}>
              <MaterialCommunityIcons name="creation" size={15} color="#4CAF50" />
            </View>
            <Text style={styles.answerTitle}>Jawapan AI :</Text>
          </View>

          {voiceState === "thinking" ? (
            <View style={styles.loadingRow}>
              <BounceDot delay={0} />
              <BounceDot delay={160} />
              <BounceDot delay={320} />
            </View>
          ) : (
            steps.map((s, i) =>
              s.loading ? (
                <View key={i} style={styles.stepRow}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepBadgeText}>{s.number}</Text>
                  </View>
                  <View style={styles.skeletonLine} />
                </View>
              ) : (
                <StepRow key={i} step={s} animate={hasAnswer} />
              )
            )
          )}
        </View>

        {/* ── FAQ Section ── */}
        <View style={styles.faqSection}>
          <View style={styles.faqHeader}>
            <MaterialCommunityIcons name="help-box-outline" size={20} color="#4CAF50" />
            <Text style={styles.faqTitle}>Soalan Lazim</Text>
          </View>

          {FAQS.map((q, i) => (
            <TouchableOpacity
              key={i}
              style={styles.faqRow}
              onPress={() => ask(q)}
              activeOpacity={0.7}
            >
              <Text style={styles.faqText}>{q}</Text>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F3",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: "center",
  },

  // Title
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 36,
  },

  // Mic
  micArea: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  micBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  micBtnListening: {
    backgroundColor: "#E53935",
    shadowColor: "#E53935",
  },
  stateLabel: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
    marginBottom: 28,
  },

  // Answer card
  answerCard: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  answerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 8,
  },
  answerIconWrap: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 5,
  },
  answerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 4,
  },

  // Steps
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 10,
  },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2E7D32",
  },
  stepText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 20,
    flex: 1,
  },
  skeletonLine: {
    flex: 1,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
    marginTop: 4,
  },

  // FAQ
  faqSection: {
    width: "100%",
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },
  faqRow: {
    backgroundColor: "white",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  faqText: {
    fontSize: 13,
    color: "#374151",
    flex: 1,
  },
});