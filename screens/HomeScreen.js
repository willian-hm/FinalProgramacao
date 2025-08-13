// Exemplo mínimo
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import InputField from '../components/InputField';
import ResultCard from '../components/ResultCard';
import ChartView from '../components/ChartView';

export default function HomeScreen() {
  const [valor, setValor] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [juros, setJuros] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const P = parseFloat(valor);
    const n = parseInt(parcelas);
    const i = parseFloat(juros) / 100;

    if (!P || !n || i < 0) return;

    const valorParcela = P * (i === 0 ? 1/n : i * Math.pow(1+i, n) / (Math.pow(1+i, n) - 1));
    const totalPago = valorParcela * n;
    const totalJuros = totalPago - P;

    setResultado({
      valorParcela: valorParcela.toFixed(2),
      totalPago: totalPago.toFixed(2),
      totalJuros: totalJuros.toFixed(2)
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.blue}>
            <Text style={styles.title}>Parcelas Já!</Text>
        </View>
        <Text style={styles.subtitle}>Simulador de Parcelamento</Text>

        <InputField placeholder="Valor da compra" keyboardType="numeric" value={valor} onChangeText={setValor} />
        <InputField placeholder="Número de parcelas" keyboardType="numeric" value={parcelas} onChangeText={setParcelas} />
        <InputField placeholder="Taxa de juros mensal (%)" keyboardType="numeric" value={juros} onChangeText={setJuros} />

        <TouchableOpacity style={styles.button} onPress={calcular}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        <ResultCard resultado={resultado} />
        {resultado && <ChartView valor={valor} totalPago={resultado.totalPago} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginTop: 10, textAlign: 'center', },
  blue: { width: 1000, justifyContent: 'center', backgroundColor: '#7db1e9ff', paddingTop: 10, paddingBottom: 10},
  subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginTop: 10, textAlign: 'center', },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginTop: 10, width: '100%' },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }
});
