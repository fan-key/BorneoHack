import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Mock data for the checklist
const INITIAL_TASKS = [
  { id: 1, time: '07:00', title: 'Periksa paras air', sub: 'Check water level', completed: true },
  { id: 2, time: '10:00', title: 'Sembur baja organik', sub: 'Apply organic fertilizer', completed: false },
  { id: 3, time: '15:00', title: 'Pantau serangan perosak', sub: 'Monitor pests', completed: false },
];

export default function Guide() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Calendar Strip Placeholder */}
      <View style={styles.calendarStrip}>
        <Text style={styles.monthText}>October 2023</Text>
        {/* You'd map days here */}
      </View>

      <Text style={styles.sectionTitle}>
        <Ionicons name="time-outline" size={18} color="green" /> Jadual Harian
      </Text>

      {/* Task List */}
      {tasks.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.taskCard}
          onPress={() => toggleTask(item.id)}
        >
          <View style={[styles.taskIcon, { backgroundColor: item.completed ? '#E8F5E9' : '#FFF9C4' }]}>
             <MaterialCommunityIcons
               name={item.id === 1 ? "water-outline" : "seed-outline"}
               size={24} color={item.completed ? "green" : "orange"}
             />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.taskTime}>{item.time}</Text>
            <Text style={[styles.taskTitle, item.completed && styles.completedText]}>
              {item.title}
            </Text>
            <Text style={styles.taskSub}>{item.sub}</Text>
          </View>
          <Ionicons
            name={item.completed ? "checkmark-circle" : "ellipse-outline"}
            size={24} color={item.completed ? "green" : "#DDD"}
          />
        </TouchableOpacity>
      ))}

      {/* AI Daily Tip */}
      <View style={styles.aiTipBox}>
        <View style={styles.tipHeader}>
          <Ionicons name="bulb-outline" size={20} color="green" />
          <Text style={styles.tipTitleText}>Peringatan Hari Ini</Text>
        </View>
        <Text style={styles.tipBody}>
          Penyiraman pada awal pagi membantu mencegah kulat...
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBFA', padding: 20 },
  calendarStrip: { alignItems: 'center', marginBottom: 20 },
  monthText: { fontSize: 18, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 15 },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1
  },
  taskIcon: { padding: 10, borderRadius: 12, marginRight: 15 },
  taskTime: { fontSize: 12, color: 'green', fontWeight: 'bold' },
  taskTitle: { fontSize: 15, fontWeight: '600' },
  taskSub: { fontSize: 12, color: '#999' },
  completedText: { textDecorationLine: 'line-through', color: '#AAA' },
  aiTipBox: { backgroundColor: '#E8F5E9', padding: 15, borderRadius: 15, marginTop: 20 },
  tipHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  tipTitleText: { marginLeft: 8, fontWeight: 'bold', color: 'green' },
  tipBody: { fontSize: 13, color: '#444', lineHeight: 18 }
});