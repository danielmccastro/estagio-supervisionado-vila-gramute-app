import { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AppContext } from "../contexts/AppContext";
import Entypo from "@expo/vector-icons/Entypo";
import ItemTarefa from "../components/ItemTarefa";

export default function ListaTarefas() {
  const [texto, setTexto] = useState("");
  const { tarefas, adicionarTarefa } = useContext(AppContext);

  const handleAdicionarTarefa = () => {
    if (texto.trim()) {
      adicionarTarefa(texto);
      setTexto("");
    }
  };

  const renderizarListaTarefas = () => {
    if (tarefas.length === 0) {
      return <Text style={styles.titulo}>Não possui tarefas.</Text>;
    }
    return tarefas.map((tarefa, index) => (
      <ItemTarefa key={index} item={tarefa} indice={index} />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerAdicionarTarefa}>
        <TextInput
          style={styles.input}
          onChangeText={setTexto}
          value={texto}
          placeholder="Adicionar tarefa"
        />
        <TouchableOpacity style={styles.botao} onPress={handleAdicionarTarefa}>
          <Entypo name="add-to-list" size={24} color="#7bc043" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.containerLista}>
        {renderizarListaTarefas()}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  titulo: {
    fontSize: 16,
    color: "#000",
    margin: 7,
    marginLeft: 15,
    fontFamily: "InterRegular",
  },
  containerAdicionarTarefa: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  input: {
    flex: 1,
    padding: 15,
    fontFamily: "InterRegular",
    backgroundColor: "#fff",
    margin: 10,
  },
  botao: {
    padding: 10,
  },
  containerLista: {
    flex: 1,
  },
});
