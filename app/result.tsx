import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Result() {

  const {
    crop,
    disease,
    confidence,
    severity
  } = useLocalSearchParams();

  return (
    <View>

      <Text>Penyakit Dikesan</Text>
      <Text>{disease}</Text>

      <Text>Tanaman: {crop}</Text>

      <Text>Keyakinan AI: {Math.round(Number(confidence)*100)}%</Text>

      <Text>Tahap: {severity}</Text>

      <Text>Rawatan Disyorkan</Text>

      <Text>1. Buang daun terjejas</Text>
      <Text>2. Guna fungisid</Text>

      <Text>Pencegahan</Text>

      <Text>• Jangan siram daun secara terus</Text>
      <Text>• Pastikan peredaran udara baik</Text>

    </View>
  );
}