import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const produtos = [
  {
    nome: "Xbox Series X",
    preco: 4500,
    descricao:
      "O Xbox Series X é o console mais poderoso da Microsoft, com suporte a jogos em 4K e alta taxa de quadros.",
    imagem: "https://m.media-amazon.com/images/I/61-jjE67uqL._AC_SX522_.jpg",
  },
  {
    nome: "Nintendo Switch",
    preco: 2000,
    descricao:
      "O Nintendo Switch é um console híbrido que pode ser usado na TV ou como portátil.",
    imagem: "https://m.media-amazon.com/images/I/61-PblYntsL._AC_SX522_.jpg",
  },
  {
    nome: "PlayStation 5",
    preco: 5000,
    descricao:
      "O PlayStation 5 é o console da Sony com gráficos de última geração e jogos exclusivos.",
    imagem: "https://m.media-amazon.com/images/I/619BkvKW35L._AC_SX522_.jpg",
  },
];

export default function LojinhaScreen({ navigation }) {
  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "#f4f4f4" }}>

        <View style={styles.container}>
          <Text style={styles.title}>Lojinha</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace("Splash")}
          >
            <Text style={styles.buttonText}>Produtos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Simule Parcelas</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de produtos */}
        <View style={styles.produtos}>
          {produtos.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.produto}
              onPress={() =>
                navigation.navigate("Produto", {
                  nome: item.nome,
                  preco: item.preco,
                  descricao: item.descricao,
                  imagem: item.imagem,
                })
              }
            >
              <Image
                source={{ uri: item.imagem }}
                style={styles.imagem}
                resizeMode="contain"
              />
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2b5de8ff",
    width: 180,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  produtos: { padding: 10 },
  produto: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  imagem: { width: "100%", height: 150, borderRadius: 10, marginBottom: 10 },
  nome: { fontSize: 20, fontWeight: "bold" },
  preco: { fontSize: 18, color: "#007AFF", marginTop: 5 },
});
