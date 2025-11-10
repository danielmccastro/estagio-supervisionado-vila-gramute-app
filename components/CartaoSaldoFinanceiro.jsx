import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function CartaoSaldoFinanceiro({ valor, titulo }) {
  const [oculto, setOculto] = useState(true);

  const alternarVisibilidade = () => setOculto((prev) => !prev);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <View style={styles.linhaConteudo}>
        <Text style={[styles.valor, oculto && styles.valorOculto]}>
          {oculto ? "••••••" : valor}
        </Text>
        <TouchableOpacity
          onPress={alternarVisibilidade}
          accessibilityLabel={oculto ? "Mostrar saldo" : "Ocultar saldo"}
        >
          <MaterialCommunityIcons
            name={oculto ? "eye-outline" : "eye-off-outline"}
            size={26}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 10,
    borderRadius: 12,
  },
  titulo: {
    fontWeight: "400",
    fontFamily: "InterRegular",
    color: "#333",
  },
  linhaConteudo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  valor: {
    fontSize: 26,
    fontFamily: "InterBold",
    color: "#000",
  },
  valorOculto: {
    color: "#9e9e9e",
    backgroundColor: "#9e9e9e33",
    borderRadius: 8,
    overflow: "hidden",
  },
});
