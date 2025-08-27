import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function ChartView({ valor, totalPago }) {
  if (!valor || !totalPago) return null;

  return (
    <View style={{ marginTop: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
        Comparativo: À vista vs Parcelado
      </Text>
      <LineChart
        data={{
          labels: ["À vista", "Parcelado"],
          datasets: [{ data: [parseFloat(valor), parseFloat(totalPago)] }],
        }}
        width={Dimensions.get("window").width - 60}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: "6", strokeWidth: "2", stroke: "#007AFF" },
        }}
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}
