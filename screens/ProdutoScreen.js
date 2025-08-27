import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // precisa instalar: npm install @react-native-picker/picker
import ResultCard from "../components/ResultCard";

export default function ProdutoScreen({ route }) {
  const { nome, preco, descricao, imagem } = route.params;

  const [parcelas, setParcelas] = useState("1");
  const [resultado, setResultado] = useState(null);

  const taxa = 0.01; // 1% ao mês

  // Fórmula de juros compostos PMT
  const calcularParcela = (P, i, n) => {
    if (i === 0) return P / n;
    return (P * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
  };

  const handleComprar = () => {
    const n = parseInt(parcelas);

    let valorParcela = 0;
    let totalPago = 0;
    let totalJuros = 0;

    if (n === 1) {
      // À vista
      valorParcela = preco;
      totalPago = preco;
    } else if (n === 2) {
      // 2x sem juros
      valorParcela = preco / 2;
      totalPago = preco;
    } else {
      // 5x ou 10x com juros compostos de 1%
      valorParcela = calcularParcela(preco, taxa, n);
      totalPago = valorParcela * n;
    }

    totalJuros = totalPago - preco;

    setResultado({
      valorParcela: valorParcela.toFixed(2),
      totalPago: totalPago.toFixed(2),
      totalJuros: totalJuros.toFixed(2),
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
      <Image source={{ uri: imagem }} style={styles.imagem}
       resizeMode="contain" // Or "cover", "stretch", "repeat", "center" 
    />
      <View style={styles.container}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.preco}>Preço: R$ {preco.toFixed(2)}</Text>
        <Text style={styles.descricao}>{descricao}</Text>

        <View style={styles.pagamento}>
          <Text style={styles.subtitulo}>Selecione o pagamento</Text>
          <Picker
            selectedValue={parcelas}
            style={styles.picker}
            onValueChange={(itemValue) => setParcelas(itemValue)}
          >
            <Picker.Item label="1x (à vista)" value="1" />
            <Picker.Item label="2x (sem juros)" value="2" />
            <Picker.Item label="5x (1% a.m.)" value="5" />
            <Picker.Item label="10x (1% a.m.)" value="10" />
          </Picker>

          <Button title="Comprar" color="#007AFF" onPress={handleComprar} />
        </View>

        <ResultCard resultado={resultado} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagem: { width: "100%", height: 300 },
  container: { padding: 15 },
  nome: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  preco: { fontSize: 20, color: "#007AFF", marginBottom: 10 },
  descricao: { fontSize: 16, marginBottom: 20 },
  pagamento: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 15,
  },
  subtitulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
  },
});
