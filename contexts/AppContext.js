import { createContext, useState, useEffect } from "react";
import { Alert, ToastAndroid, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

export const AppContext = createContext();

function AppProvider({ children }) {
    const [autenticado, setAutenticado] = useState(false);
    const [fontesCarregadas, setFontesCarregadas] = useState(false);
    const [tarefas, setTarefas] = useState([]);
    const [tarefaPrioritaria, setTarefaPrioritaria] = useState(null);
    const [receitas, setReceitas] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [carregando, setCarregando] = useState(true);

    function mostrarMensagem(mensagem) {
        if (Platform.OS === "android") {
            ToastAndroid.show(mensagem, ToastAndroid.SHORT);
        } else {
            setTimeout(() => Alert.alert("", mensagem), 100);
        }
    }

    useEffect(() => {
        async function carregarFontes() {
            await Font.loadAsync({
                InterLight: require("../assets/fonts/Inter_300Light.ttf"),
                InterRegular: require("../assets/fonts/Inter_400Regular.ttf"),
                InterSemiBold: require("../assets/fonts/Inter_600SemiBold.ttf"),
                InterBold: require("../assets/fonts/Inter_700Bold.ttf"),
            });
            setFontesCarregadas(true);
        }
        carregarFontes();
    }, []);

    useEffect(() => {
        async function carregarArmazenamento() {
            try {
                const armazenamentoTarefas = await AsyncStorage.getItem("@armazenamentoTarefas");
                const armazenamentoReceitas = await AsyncStorage.getItem("@armazenamentoReceitas");
                const armazenamentoDespesas = await AsyncStorage.getItem("@armazenamentoDespesas");
                setTarefas(armazenamentoTarefas ? JSON.parse(armazenamentoTarefas) : []);
                setReceitas(armazenamentoReceitas ? JSON.parse(armazenamentoReceitas) : []);
                setDespesas(armazenamentoDespesas ? JSON.parse(armazenamentoDespesas) : []);
            } catch (err) {
                console.error("Erro ao carregar armazenamento:", err);
            } finally {
                setCarregando(false);
            }
        }
        carregarArmazenamento();
    }, []);

    async function adicionarTarefa(descricaoTarefa, prioridade = false) {
        try {
            if (!descricaoTarefa.trim()) {
                mostrarMensagem("Por favor, insira uma descrição.");
                return;
            }
            const novaTarefa = { descricao: descricaoTarefa.trim(), prioridade };
            const tarefasAtualizadas = [...tarefas, novaTarefa];
            setTarefas(tarefasAtualizadas);
            await AsyncStorage.setItem("@armazenamentoTarefas", JSON.stringify(tarefasAtualizadas));
            mostrarMensagem("Tarefa adicionada com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
        }
    }

    async function deletarTarefa(indice) {
        try {
            const tarefasAtualizadas = tarefas.filter((_, i) => i !== indice);
            setTarefas(tarefasAtualizadas);
            await AsyncStorage.setItem("@armazenamentoTarefas", JSON.stringify(tarefasAtualizadas));
            mostrarMensagem("Tarefa deletada com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
        }
    }

    async function marcarComoPrioritaria(indice) {
        try {
            const tarefaSelecionada = tarefas[indice];
            if (tarefaSelecionada?.prioridade) {
                return;
            }
            const tarefasAtualizadas = tarefas.map((t, i) => ({
                ...t,
                prioridade: i === indice,
            }));
            setTarefas(tarefasAtualizadas);
            await AsyncStorage.setItem("@armazenamentoTarefas", JSON.stringify(tarefasAtualizadas));
            setTarefaPrioritaria(tarefasAtualizadas[indice]);
            mostrarMensagem("Tarefa prioritária definida!");
        } catch (error) {
            console.error("Erro ao marcar tarefa prioritária:", error);
        }
    }


    async function obterTarefaPrioritaria() {
        try {
            const armazenamentoTarefas = await AsyncStorage.getItem("@armazenamentoTarefas");
            const lista = armazenamentoTarefas ? JSON.parse(armazenamentoTarefas) : [];
            const tarefa = lista.find(t => t.prioridade);
            setTarefaPrioritaria(tarefa || null);
            return tarefa || null;
        } catch (error) {
            console.error("Erro ao obter tarefa prioritária:", error);
            return null;
        }
    }

    async function adicionarReceita(valor, descricao) {
        try {
            if (!valor || !descricao) {
                mostrarMensagem("Valor e descrição devem ser preenchidos.");
                return;
            }

            const valorLimpo = String(valor).trim().replace(",", ".");
            const valorNumerico = parseFloat(valorLimpo);

            if (isNaN(valorNumerico)) {
                mostrarMensagem("O valor deve ser um número válido.");
                return;
            }

            const novaReceita = {
                valor: valorNumerico.toFixed(2),
                descricao: descricao.trim(),
            };

            const receitasAtualizadas = [...receitas, novaReceita];
            setReceitas(receitasAtualizadas);
            await AsyncStorage.setItem("@armazenamentoReceitas", JSON.stringify(receitasAtualizadas));

            mostrarMensagem("Receita adicionada com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar receita:", error);
        }
    }

    async function excluirReceita(indice) {
        try {
            const receitasAtualizadas = receitas.filter((_, i) => i !== indice);
            setReceitas(receitasAtualizadas);
            await AsyncStorage.setItem("@armazenamentoReceitas", JSON.stringify(receitasAtualizadas));

            mostrarMensagem("Receita excluída com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir receita:", error);
        }
    }

    async function adicionarDespesa(valor, descricao) {
        try {
            if (!valor || !descricao) {
                mostrarMensagem("Valor e descrição devem ser preenchidos.");
                return;
            }

            const valorLimpo = String(valor).trim().replace(",", ".");
            const valorNumerico = parseFloat(valorLimpo);

            if (isNaN(valorNumerico)) {
                mostrarMensagem("O valor deve ser um número válido.");
                return;
            }

            const novaDespesa = {
                valor: valorNumerico.toFixed(2),
                descricao: descricao.trim(),
            };

            const despesasAtualizadas = [...despesas, novaDespesa];
            setDespesas(despesasAtualizadas);
            await AsyncStorage.setItem("@armazenamentoDespesas", JSON.stringify(despesasAtualizadas));

            mostrarMensagem("Despesa adicionada com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar despesa:", error);
        }
    }

    async function excluirDespesa(indice) {
        try {
            const despesasAtualizadas = despesas.filter((_, i) => i !== indice);
            setDespesas(despesasAtualizadas);
            await AsyncStorage.setItem("@armazenamentoDespesas", JSON.stringify(despesasAtualizadas));

            mostrarMensagem("Despesa excluída com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir despesa:", error);
        }
    }

    function somarValores(registros = []) {
        return registros.reduce((acc, curr) => acc + Number(curr.valor || 0), 0);
    }

    return (
        <AppContext.Provider
            value={{
                fontesCarregadas,
                tarefas,
                setTarefas,
                adicionarTarefa,
                deletarTarefa,
                marcarComoPrioritaria,
                tarefaPrioritaria,
                obterTarefaPrioritaria,
                receitas,
                despesas,
                adicionarDespesa,
                excluirDespesa,
                adicionarReceita,
                excluirReceita,
                somarValores,
                autenticado,
                setAutenticado,
                carregando,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
