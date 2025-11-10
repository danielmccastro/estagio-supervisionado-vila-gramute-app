import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function CartaoLancamentoFinanceiro({ valor, titulo, total }) {
  const [oculto, setOculto] = useState(true);

  const alternarVisibilidade = () => setOculto((estadoAnterior) => !estadoAnterior);

  const renderizarItem = (item, index) => (
    <View key={index} style={styles.itemContainer}>
      <MaterialCommunityIcons
        name={titulo === "Despesas" ? "minus-circle" : "plus-circle"}
        size={30}
        color={titulo === "Despesas" ? "#ee4035" : "#7bc043"}
      />
      <View style={styles.detalhesItem}>
        <Text style={styles.descricaoItem}>{item.descricao}</Text>
        <Text style={styles.valorItem}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.valor)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>{titulo}</Text>
        <TouchableOpacity onPress={alternarVisibilidade}>
          <MaterialCommunityIcons
            name={oculto ? "chevron-down" : "chevron-up"}
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {!oculto && (
        <View>
          {valor.length === 0 ? (
            <Text style={styles.textoSemRegistros}>Não possui registros.</Text>
          ) : (
            <>
              <Text style={styles.totalTexto}>Total: {total}</Text>
              <ScrollView>{valor.map(renderizarItem)}</ScrollView>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    fontSize: 16,
    fontFamily: "InterRegular",
  },
  textoSemRegistros: {
    fontSize: 14,
    fontFamily: "InterLight",
    marginTop: 10,
  },
  totalTexto: {
    fontSize: 16,
    fontFamily: "InterBold",
    textAlign: "right",
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  detalhesItem: {
    flex: 1,
    marginLeft: 15,
  },
  descricaoItem: {
    fontSize: 14,
    fontFamily: "InterLight",
  },
  valorItem: {
    fontSize: 14,
    fontFamily: "InterRegular",
  },
});
