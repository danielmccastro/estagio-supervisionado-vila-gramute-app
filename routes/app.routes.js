import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View, Text, Image } from "react-native";

import Home from "../pages/Home";
import Financas from "../pages/Financas";
import ListaTarefas from "../pages/ListaTarefas";

const Tab = createBottomTabNavigator();

const HeaderLogoTitle = ({ title }) => (
    <View
        style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 16,
        }}
    >
        <Text
            style={{
                fontSize: 25,

                color: "#333",
                fontFamily: "InterRegular",
            }}
        >
            {title}
        </Text>
        <Image
            source={require("../assets/logo.png")}
            style={{ width: 80, height: 80, resizeMode: "contain" }}
        />
    </View>
);

export default function AppRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#FFF",
                    height: 60,
                    padding: 5,
                },
                tabBarActiveTintColor: "#73AF01",
                tabBarInactiveTintColor: "#000",
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginBottom: 5,
                    fontFamily: "OpenSans",
                    textAlign: "center",
                },
                headerStyle: {
                    backgroundColor: "#F8F9FA",
                },
                headerTitleAlign: "center",
            }}
        >
            <Tab.Screen
                name="Início"
                component={Home}
                options={{
                    headerTitle: () => <HeaderLogoTitle title="Início" />,
                    tabBarIcon: ({ color, size }) => (
                         <FontAwesome5 name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Finanças"
                component={Financas}
                options={{
                    headerTitle: () => <HeaderLogoTitle title="Registros" />,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="dollar-sign" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tarefas"
                component={ListaTarefas}
                options={{
                    headerTitle: () => <HeaderLogoTitle title="Tarefas" />,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="tasks" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}