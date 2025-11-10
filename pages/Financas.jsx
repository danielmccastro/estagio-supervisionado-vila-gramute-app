import { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { AppContext } from "../contexts/AppContext";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { formatarMoeda } from "../services/moeda";
import CartaoSaldoFinanceiro from "../components/CartaoSaldoFinanceiro";

export default function Financas() {
  const {
    receitas,
    despesas,
    adicionarReceita,
    adicionarDespesa,
    excluirReceita,
    excluirDespesa,
    somarValores,
  } = useContext(AppContext);

  const [alternar, setAlternar] = useState("Despesa");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const totalDespesas = somarValores(despesas);
  const totalReceitas = somarValores(receitas);

  const handleAlternar = () =>
    setAlternar(alternar === "Despesa" ? "Receita" : "Despesa");

  const handleAdicionar = () => {
    if (alternar === "Despesa") {
      adicionarDespesa(valor, descricao);
    } else {
      adicionarReceita(valor, descricao);
    }
    setDescricao("");
    setValor("");
  };

  const renderizarItens = (itens, excluirItem) => {
    return itens.length > 0 ? (
      itens.map((item, index) => (
        <View key={index} style={styles.linhaItem}>
          <Text style={styles.titulo}>{item.descricao}</Text>
          <Text style={styles.titulo}>{formatarMoeda(item.valor)}</Text>
          <TouchableOpacity
            onPress={() => excluirItem(index)}
            style={styles.botaoExcluir}
          >
            <FontAwesome
              name="trash-o"
              size={24}
              color={alternar === "Despesa" ? "#ee4035" : "#7bc043"}
            />
          </TouchableOpacity>
        </View>
      ))
    ) : (
      <Text style={styles.titulo}>Não possui {alternar.toLowerCase()}s.</Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.opcaoRegistro}>
        {["Despesa", "Receita"].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            onPress={() => alternar !== tipo && handleAlternar()}
            style={styles.botaoTipo}
          >
            <Text
              style={
                alternar === tipo ? styles.textoTipoAtivo : styles.textoTipo
              }
            >
              {tipo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.conteudoPrincipal}>
        <CartaoSaldoFinanceiro
          valor={formatarMoeda(
            alternar === "Despesa" ? totalDespesas : totalReceitas
          )}
          titulo={alternar === "Despesa" ? "Despesas" : "Receitas"}
        />

        <View style={styles.adicionarRegistro}>
          <TextInput
            style={styles.input}
            onChangeText={setDescricao}
            value={descricao}
            placeholder="Descrição"
          />
          <TextInput
            style={styles.input}
            onChangeText={setValor}
            value={valor}
            placeholder="Valor"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.botao} onPress={handleAdicionar}>
            <Entypo
              name="add-to-list"
              size={24}
              color={alternar === "Despesa" ? "#ee4035" : "#7bc043"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {renderizarItens(
            alternar === "Despesa" ? despesas : receitas,
            alternar === "Despesa" ? excluirDespesa : excluirReceita
          )}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  opcaoRegistro: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  textoTipoAtivo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#73AF01",
    fontFamily: "InterRegular",
  },
  textoTipo: {
    fontSize: 16,
    fontWeight: "300",
    color: "#000",
    fontFamily: "InterRegular",
  },
  conteudoPrincipal: {
    flex: 1,
  },
  adicionarRegistro: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  input: {
    flex: 0.98,
    padding: 15,
    backgroundColor: "#fff",
    margin: 10,
    fontFamily: "InterRegular",
  },
  botao: {
    padding: 10,
  },
  botaoTipo: {
    padding: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
  },
  titulo: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    marginLeft: 15,
    margin: 7,
    fontWeight: "300",
    fontFamily: "InterRegular",
  },
  linhaItem: {
    flexDirection: "row",
  },
  botaoExcluir: {
    marginRight: 10,
  },
});
