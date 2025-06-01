import { useEffect } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function MainScreen({ onLogout }: any) {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);


    const menuOptions = [
        { label: "Perfil", icon: "👤" },
        { label: "Portafolio", icon: "🗂️" },
        { label: "Acerca de", icon: "ℹ️" },
        { label: "Ayuda", icon: "❓" },
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require("../assets/logo.png")} />
                <Text style={styles.title}>Bienvenido a HealthApp</Text>
                <Text style={styles.subtitle}>Tu salud en buenas manos.</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🫀Servicios Médicos</Text>
                    <Text style={styles.sectionText}>
                    En HealthApp encuentras todo lo que necesitas para cuidar tu salud: Cirugia Cardiovascular, Consultas Externa, Pediatría, Hospitalizacion, Unidad de Cuidados Intencivos, ECMO y Oncologia.
                    Te acompañamos con un equipo comprometido y herramientas tecnológicas de vanguardia, porque tu bienestar es nuestra razón de ser.
                    </Text>
                </View>

                <Text style={styles.menuTitle}>Menú</Text>
                <View style={styles.menuGrid}>{menuOptions.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuCard}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuText}>{item.label}</Text>
                 </TouchableOpacity>
                 ))}
                </View>


                

                <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                    <Text style={styles.logoutText}>🔓 Cerrar Sesion</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#f7fdfc",
        padding: 20,
    },
    container: {
        alignItems: "center",
    },
    logo: {
        height: 100,
        width: 100,
        marginBottom: 20,        
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#2b6777",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: "#4f9a94",
        marginBottom: 20,
        textAlign: "center",
    },
    section: {
        backgroundColor: "#e0f7f1",
        borderRadius: 12,
        padding: 15,
        width: "100%",
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: "#52ab98",
    },
    sectionText: {
        fontSize: 15,
        color: "#333",
        lineHeight: 22,
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#2b6777",
        marginBottom: 10,
        alignSelf: "flex-start",
    },
    menu: {
        width: "100%",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#52ab98",
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
    },
    menuIcon: {
        fontSize: 22,
        marginRight: 10,
        color: "white",
    },
    menuText: {
        fontSize: 16,
        color: "white",
        fontWeight: "500",
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: "#2b6777",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    logoutText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    menuGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },
    menuCard: {
        width: "47%",
        backgroundColor: "#52ab98",
        borderRadius: 12,
        paddingVertical: 25,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2.5,
        elevation: 3,
    }

});