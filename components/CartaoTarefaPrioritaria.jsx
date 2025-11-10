import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CartaoTarefaPrioritaria({ tarefaPrioritaria }) {
  return (
    <View style={styles.container}>
      {tarefaPrioritaria ? (
        <>
          <Text style={styles.titulo}>Tarefa Prioritária</Text>
          <View style={styles.conteudo}>
            <AntDesign name="warning" size={26} color="#D4AF37" />
            <Text style={styles.descricao}>{tarefaPrioritaria.descricao}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.semTarefa}>
          Nenhuma tarefa prioritária cadastrada.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 10,
  },
  titulo: {
    fontSize: 16,
    fontFamily: "InterRegular",
    color: "#333",
  },
  conteudo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  descricao: {
    fontSize: 16,
    fontFamily: "InterBold",
    marginLeft: 10,
    color: "#000",
    flexShrink: 1,
  },
  semTarefa: {
    fontSize: 16,
    fontFamily: "InterLight",
    textAlign: "center",
    color: "#555",
  },
});
