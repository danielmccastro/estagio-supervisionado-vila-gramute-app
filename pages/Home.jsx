import { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView } from "react-native";
import { AppContext } from "../contexts/AppContext";
import { formatarMoeda } from "../services/moeda.js";
import CartaoSaldoFinanceiro from "../components/CartaoSaldoFinanceiro.jsx";
import CartaoLancamentoFinanceiro from "../components/CartaoLancamentoFinanceiro.jsx";
import CartaoTarefaPrioritaria from "../components/CartaoTarefaPrioritaria.jsx";

export default function Home() {
  const {
    tarefas,
    tarefaPrioritaria,
    marcarComoPrioritaria,
    obterTarefaPrioritaria,
    receitas,
    despesas,
    somarValores,
  } = useContext(AppContext);

  const totalDespesas = somarValores(despesas);
  const totalReceitas = somarValores(receitas);
  const saldo = totalReceitas - totalDespesas;

  useEffect(() => {
    const carregarTarefaPrioritaria = async () => {
      const tarefa = await obterTarefaPrioritaria();
      if (tarefa) {
        const indice = tarefas.findIndex(t => t.descricao === tarefa.descricao);
        if (indice !== -1) {
          marcarComoPrioritaria(indice);
        }
      }
    };
    carregarTarefaPrioritaria();
  }, [tarefas]);

  return (
    <ScrollView style={estilos.container}>
      <CartaoTarefaPrioritaria tarefaPrioritaria={tarefaPrioritaria} />
      <CartaoSaldoFinanceiro valor={formatarMoeda(saldo)} titulo="Saldo" />
      <CartaoLancamentoFinanceiro
        titulo="Receitas"
        total={formatarMoeda(totalReceitas)}
        valor={receitas}
      />
      <CartaoLancamentoFinanceiro
        titulo="Despesas"
        total={formatarMoeda(totalDespesas)}
        valor={despesas}
      />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
});
