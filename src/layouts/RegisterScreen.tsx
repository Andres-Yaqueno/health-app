import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ActivityIndicator,Image,ScrollView} from "react-native";
import { supabase } from "../supabaseClient";

export default function RegisterScreen({ onClose }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [mobilephone, setMobilePhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async () => {
    setErrorMessage("");

    if (!email || !password || !fullname || !mobilephone) {
        setErrorMessage("All fields are required.");
        return;
    }

    if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
    }

    setLoading(true);

    const { data: existingUser, error: fetchError } = await supabase
        .from("USERS")
        .select("id")
        .eq("email", email)
        .single();

    if (existingUser) {
        setErrorMessage("Este correo electrónico ya está registrado.");
        setLoading(false);
        return;
    }


    const { error: insertError } = await supabase.from("USERS").insert([
        {
            email: email,
            fullname: fullname,
            mobile_phone: mobilephone,
            password: password,
        },
    ]);
    setLoading(false);

    if (insertError) {
        console.log("Insert error:", insertError);
        const message = insertError.message?.toLowerCase() || "";
    
        if (
            message.includes("duplicate key") ||
            message.includes("email") ||
            message.includes("unique constraint")
        ) {
            setErrorMessage("El correo electrónico ya está registrado.");
        } else {
            setErrorMessage(insertError.message || "Ocurrió un error inesperado.");
        }
    } else {
        alert("Usuario registrado exitosamente");
        onClose();
    }
};


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={require("../assets/images/login.png")} 
                    style={styles.headerImage}
                />

                <Text style={styles.title}>Create your account</Text>

                <TextInput
                    style={styles.input}
                    placeholder="👤 Full Name"
                    value={fullname}
                    onChangeText={setFullName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="📧 Email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="📱 Mobile phone"
                    keyboardType="phone-pad"
                    value={mobilephone}
                    onChangeText={setMobilePhone}
                />

                <TextInput
                    style={styles.input}
                    placeholder="🔒 Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TextInput
                    style={styles.input}
                    placeholder="🔒 Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                <TouchableOpacity
                    style={[styles.button, loading && { opacity: 0.6 }]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonText}>Register</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.link}>Back to login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#f7fdfc",
        padding: 20,
    },
    container: {
        alignItems: "center",
    },
    headerImage: {
        width: 200,
        height: 100,
        marginBottom: 20,
        resizeMode: "contain",
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#2b6777",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 12,
        marginVertical: 8,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#cbd5e0",
    },
    button: {
        marginTop: 20,
        backgroundColor: "#52ab98",
        padding: 14,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    link: {
        marginTop: 20,
        color: "#2b6777",
        textDecorationLine: "underline",
    },
    error: {
        color: "red",
        marginTop: 10,
        textAlign: "center",
    },
});