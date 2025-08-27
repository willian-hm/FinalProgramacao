import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ResultCard({ resultado }) {
  if (!resultado) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Valor da parcela: R$ {resultado.valorParcela}
      </Text>
      <Text style={styles.text}>Total pago: R$ {resultado.totalPago}</Text>
      <Text style={styles.text}>Total de juros: R$ {resultado.totalJuros}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#e6f0ff",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 3,
  },
});
