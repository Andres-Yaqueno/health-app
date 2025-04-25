import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../supabaseClient";

export default function RegisterScreen({ onClose }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [mobilephone, setMobilePhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleRegister = async () => {
        setLoading(true);
        setErrorMessage("");

        const { data, error } = await supabase.auth.signUp({
            email, 
            password
        });

        if(error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }

        //Insert data into Supabase table
        const { error: InsertError } = await supabase.from("users").insert([
            { 
                email: email, 
                password: password,
                fullname: fullname,
                mobile_phone: mobilephone
            }
        ]);

        setLoading(false);
        if (InsertError) {
            setErrorMessage(InsertError.message);
        } else {
            alert("User has been created successfully");
            onClose();
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
            <TextInput
                style={styles.input}
                placeholder="admin@mail.com"
            />
            <TextInput
                style={styles.input}
                placeholder="*********"
            />
            <TextInput
                style={styles.input}
                placeholder="Your fullname"
            />
            <TextInput
                style={styles.input}
                placeholder="(+57) 000000000"
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
                <Text style={styles.link}>Back to login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F0F0"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20
    },
    input: {
        width: "80%",
        padding: 10,
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    button: {
        marginTop: 20,
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        width: "80%",
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold"
    },
    link: {
        marginTop: 10,
        color: "blue",
        textDecorationLine: "underline"
    },
});

