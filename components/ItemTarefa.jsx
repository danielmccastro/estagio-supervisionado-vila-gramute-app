import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function ItemTarefa({ item, indice }) {
  const { deletarTarefa, marcarComoPrioritaria } = useContext(AppContext);

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{item.descricao}</Text>
      <View style={estilos.containerIcones}>
        <TouchableOpacity
          onPress={() => marcarComoPrioritaria(indice)}
          style={estilos.botaoIcone}
        >
          <AntDesign name="warning" size={24} color="#E9D502" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deletarTarefa(indice)}>
          <FontAwesome name="trash-o" size={24} color="#ee4035" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  titulo: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontFamily: "InterRegular",
  },
  containerIcones: {
    flexDirection: "row",
    alignItems: "center",
  },
  botaoIcone: {
    marginRight: 15,
  },
});
