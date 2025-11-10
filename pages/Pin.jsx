import { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { AppContext } from "../contexts/AppContext";

const { APP_PIN } = Constants.expoConfig.extra;

export default function TelaPin() {
  const [pin, setPin] = useState("");
  const { setAutenticado } = useContext(AppContext);

  const handleEnviar = () => {
    if (pin === APP_PIN) {
      setAutenticado(true);
    } else {
      Alert.alert("PIN incorreto", "Tente novamente.");
      setPin("");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.imagem} />
      <Text style={styles.rotulo}>Digite o PIN:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        value={pin}
        onChangeText={setPin}
        placeholder="****"
      />
      <TouchableOpacity style={styles.botao} onPress={handleEnviar}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#E8F5E9",
  },
  imagem: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: "center",
  },
  rotulo: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "InterRegular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: "#fff",
    fontFamily: "InterRegular",
  },
  botao: {
    backgroundColor: "#AEC88B",
    padding: 12,
    alignItems: "center",
    borderRadius: 4,
  },
  textoBotao: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "InterMedium",
  },
});
