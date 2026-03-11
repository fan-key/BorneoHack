import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// ── Types ─────────────────────────────────────────────────────────────────────
type Task = {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  done: boolean;
  color: string;
  icon: string;
};

type FAQ = {
  q: string;
  qSub: string;
  a: string;
  aSub: string;
};

// ── Calendar helpers ──────────────────────────────────────────────────────────
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// ── Static data ───────────────────────────────────────────────────────────────
const INITIAL_TASKS: Task[] = [
  { id: "1", time: "07:00", title: "Periksa paras air",     subtitle: "Check water level",        done: true,  color: "#22C55E", icon: "water-outline" },
  { id: "2", time: "10:00", title: "Sembur baja organik",   subtitle: "Apply organic fertilizer", done: false, color: "#F59E0B", icon: "leaf-outline" },
  { id: "3", time: "15:00", title: "Pantau serangan perosak", subtitle: "Monitor pests",          done: false, color: "#9CA3AF", icon: "bug-outline" },
];

const REMINDERS = [
  { title: "Masa penyiraman optimum ialah 7-9 pagi", sub: "Optimal watering time is 7-9 AM" },
  { title: "Periksa perosak di bawah daun",           sub: "Check for pests under leaves" },
];

const FAQS: FAQ[] = [
  {
    q: "Daun kuning? / Yellow leaves?",
    qSub: "",
    a: "Tambahkan baja nitrogen untuk menggalakkan pertumbuhan hijau.",
    aSub: "Add nitrogen fertilizer to promote green growth.",
  },
  {
    q: "Layu? / Wilting?",
    qSub: "",
    a: "Periksa kelembapan tanah; siram jika tanah terasa kering.",
    aSub: "Check soil moisture; water if soil feels dry.",
  },
  {
    q: "Bintik coklat? / Brown spots?",
    qSub: "",
    a: "Mungkin disebabkan kulat. Gunakan fungisida organik dan kurangkan kelembapan.",
    aSub: "Likely fungal. Use organic fungicide and reduce moisture.",
  },
  {
    q: "Pertumbuhan perlahan? / Slow growth?",
    qSub: "",
    a: "Semak pencahayaan dan pastikan tanah mendapat nutrien yang cukup.",
    aSub: "Check lighting and ensure soil has sufficient nutrients.",
  },
];

// ── FAQ Accordion item ────────────────────────────────────────────────────────
function FAQItem({ item }: { item: FAQ }) {
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 260,
      useNativeDriver: false,
    }).start();
    setOpen(!open);
  };

  const maxHeight = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 100] });
  const opacity   = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity style={styles.faqRow} onPress={toggle} activeOpacity={0.75}>
        <Text style={styles.faqQ}>{item.q}</Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#9CA3AF" />
      </TouchableOpacity>
      <Animated.View style={{ maxHeight, opacity, overflow: "hidden" }}>
        <View style={styles.faqAnswer}>
          <Text style={styles.faqA}>{item.a}</Text>
          {item.aSub ? <Text style={styles.faqASub}>{item.aSub}</Text> : null}
        </View>
      </Animated.View>
    </View>
  );
}

// ── Task row ──────────────────────────────────────────────────────────────────
function TaskRow({ task, onToggle }: { task: Task; onToggle: () => void }) {
  return (
    <View style={[styles.taskCard, task.done && styles.taskCardDone]}>
      <View style={[styles.taskAccent, { backgroundColor: task.color }]} />
      <View style={[styles.taskIconWrap, { backgroundColor: task.color + "22" }]}>
        <Ionicons name={task.icon as any} size={20} color={task.color} />
      </View>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTime, { color: task.done ? "#9CA3AF" : task.color }]}>{task.time}</Text>
        <Text style={[styles.taskTitle, task.done && styles.taskTitleDone]}>{task.title}</Text>
        <Text style={styles.taskSub}>{task.subtitle}</Text>
      </View>
      <TouchableOpacity onPress={onToggle} style={styles.taskCheck} activeOpacity={0.7}>
        {task.done
          ? <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
          : <View style={styles.taskCheckEmpty} />
        }
      </TouchableOpacity>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function Library() {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const daysInMonth  = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const toggleTask = (id: string) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  // Build calendar grid
  const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
  const cells: (number | null)[] = [];
  for (let i = 0; i < totalCells; i++) {
    const day = i - firstDayOfWeek + 1;
    cells.push(day >= 1 && day <= daysInMonth ? day : null);
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Calendar ── */}
        <View style={styles.calCard}>
          {/* Month nav */}
          <View style={styles.calHeader}>
            <TouchableOpacity onPress={prevMonth} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="chevron-back" size={20} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.calMonth}>{MONTHS[month]} {year}</Text>
            <TouchableOpacity onPress={nextMonth} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="chevron-forward" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Day labels */}
          <View style={styles.calDayLabels}>
            {DAY_LABELS.map((d, i) => (
              <Text key={i} style={styles.calDayLabel}>{d}</Text>
            ))}
          </View>

          {/* Day grid */}
          <View style={styles.calGrid}>
            {cells.map((day, i) => {
              const isToday   = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = day === selectedDay;
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.calCell}
                  onPress={() => day && setSelectedDay(day)}
                  activeOpacity={day ? 0.7 : 1}
                  disabled={!day}
                >
                  {day ? (
                    <View style={[
                      styles.calDayInner,
                      isSelected && styles.calDaySelected,
                    ]}>
                      <Text style={[
                        styles.calDayText,
                        isSelected && styles.calDayTextSelected,
                        isToday && !isSelected && styles.calDayToday,
                      ]}>
                        {day}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Jadual Harian ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="time-outline" size={20} color="#22C55E" />
            <Text style={styles.sectionTitle}>Jadual Harian</Text>
          </View>

          {tasks.map(task => (
            <TaskRow key={task.id} task={task} onToggle={() => toggleTask(task.id)} />
          ))}

          {/* Alert banner */}
          <View style={styles.alertBanner}>
            <View style={styles.alertIconWrap}>
              <Ionicons name="notifications" size={18} color="#F59E0B" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertText}>Peringatan: Rekod hasil hari ini</Text>
              <Text style={styles.alertSub}>Reminder: Record today's yield</Text>
            </View>
          </View>
        </View>

        {/* ── Peringatan Hari Ini ── */}
        <View style={styles.tipCard}>
          <View style={styles.tipIconWrap}>
            <Ionicons name="bulb" size={20} color="#22C55E" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Peringatan Hari Ini</Text>
            <Text style={styles.tipBody}>
              Penyiraman pada awal pagi membantu mencegah kulat dan memastikan anda tumbuhan terhidrat sebelum matahari masuk terlalu panas.
            </Text>
          </View>
        </View>

        {/* ── Peringatan Penting ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle-outline" size={20} color="#22C55E" />
            <Text style={styles.sectionTitle}>Peringatan Penting</Text>
          </View>

          <View style={styles.remindersCard}>
            {REMINDERS.map((r, i) => (
              <View key={i}>
                <View style={styles.reminderRow}>
                  <Ionicons name="checkmark-circle-outline" size={18} color="#22C55E" style={{ marginRight: 10, marginTop: 1 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reminderTitle}>{r.title}</Text>
                    <Text style={styles.reminderSub}>{r.sub}</Text>
                  </View>
                </View>
                {i < REMINDERS.length - 1 && <View style={styles.reminderDivider} />}
              </View>
            ))}
          </View>
        </View>

        {/* ── Masalah Biasa & Penyelesaian ── */}
        <View style={[styles.section, { marginBottom: 10 }]}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="help-circle-outline" size={20} color="#22C55E" />
            <Text style={styles.sectionTitle}>Masalah Biasa & Penyelesaian</Text>
          </View>

          <View style={styles.faqCard}>
            {FAQS.map((item, i) => (
              <View key={i}>
                <FAQItem item={item} />
                {i < FAQS.length - 1 && <View style={styles.faqDivider} />}
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F3" },
  scroll: { padding: 16, paddingBottom: 40 },

  // Calendar
  calCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  calHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  calMonth: { fontSize: 16, fontWeight: "800", color: "#111" },
  calDayLabels: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 6,
  },
  calDayLabel: { width: 36, textAlign: "center", fontSize: 12, color: "#9CA3AF", fontWeight: "600" },
  calGrid: { flexDirection: "row", flexWrap: "wrap" },
  calCell: { width: "14.28%", alignItems: "center", marginBottom: 4 },
  calDayInner: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  calDaySelected: { backgroundColor: "#22C55E" },
  calDayText: { fontSize: 14, color: "#374151", fontWeight: "500" },
  calDayTextSelected: { color: "white", fontWeight: "700" },
  calDayToday: { color: "#22C55E", fontWeight: "700" },

  // Section
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#111" },

  // Task card
  taskCard: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    overflow: "hidden",
  },
  taskCardDone: { opacity: 0.75 },
  taskAccent: { position: "absolute", left: 0, top: 0, bottom: 0, width: 4, borderTopLeftRadius: 14, borderBottomLeftRadius: 14 },
  taskIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", marginLeft: 8, marginRight: 12 },
  taskInfo: { flex: 1 },
  taskTime: { fontSize: 12, fontWeight: "700", marginBottom: 2 },
  taskTitle: { fontSize: 14, fontWeight: "700", color: "#111" },
  taskTitleDone: { textDecorationLine: "line-through", color: "#9CA3AF" },
  taskSub: { fontSize: 12, color: "#9CA3AF", marginTop: 1 },
  taskCheck: { padding: 4 },
  taskCheckEmpty: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: "#D1D5DB" },

  // Alert banner
  alertBanner: {
    backgroundColor: "#FFFBEB",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginTop: 4,
  },
  alertIconWrap: { backgroundColor: "#FEF3C7", borderRadius: 10, padding: 8, marginRight: 12 },
  alertText: { fontSize: 13, fontWeight: "700", color: "#D97706" },
  alertSub: { fontSize: 12, color: "#92400E", marginTop: 1 },

  // Tip card
  tipCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  tipIconWrap: { backgroundColor: "#DCFCE7", borderRadius: 10, padding: 8 },
  tipTitle: { fontSize: 14, fontWeight: "800", color: "#15803D", marginBottom: 4 },
  tipBody: { fontSize: 13, color: "#166534", lineHeight: 20 },

  // Reminders card
  remindersCard: {
    backgroundColor: "white",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  reminderRow: { flexDirection: "row", alignItems: "flex-start", paddingVertical: 14 },
  reminderTitle: { fontSize: 13, fontWeight: "700", color: "#111" },
  reminderSub: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  reminderDivider: { height: 1, backgroundColor: "#F3F4F6" },

  // FAQ card
  faqCard: {
    backgroundColor: "white",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  faqItem: { paddingVertical: 4 },
  faqRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 14 },
  faqQ: { fontSize: 13, fontWeight: "700", color: "#111", flex: 1, marginRight: 8 },
  faqAnswer: { paddingBottom: 14 },
  faqA: { fontSize: 13, color: "#374151", lineHeight: 20 },
  faqASub: { fontSize: 12, color: "#9CA3AF", marginTop: 3 },
  faqDivider: { height: 1, backgroundColor: "#F3F4F6" },
});