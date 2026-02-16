import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LandingPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/home');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handlePress = () => {
        router.replace('/home');
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={1}>
            <View style={styles.contentContainer}>
                {/* Placeholder for the Train Illustration */}
                <View style={styles.illustrationContainer}>
                    {/* <Image
                        source={require('@/assets/images/train-illustration.png')} // Assuming we might add this later, but for now we'll use a style to mock it or just a view
                        style={styles.illustration}
                        resizeMode="contain"
                    /> */}
                    {/* Fallback visual if image shouldn't be required immediately for the code to run without error, 
               but expo-router might complain if the asset doesn't exist. 
               Let's use a simple View with a color or an Icon for now if the image is missing. 
               Actually, I should check if I have an image. I don't. 
               So I will just use a View with a shape or an IconSymbol if available, or just text/shapes.
           */}
                    <View style={styles.placeholderIllustration} />
                </View>

                <View style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleOrange}>Ticket</Text>
                        {/* The design shows "Ticket" as one word but colored differently? 
                Actually the image shows "Ticket" with 'T' in orange and 'icket' in dark blue.
            */}
                        <Text style={styles.titleDark}>icket</Text>
                    </View>
                    <Text style={styles.subtitle}>Book your train ticket</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        alignItems: 'center',
    },
    illustrationContainer: {
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustration: {
        width: 200,
        height: 200,
    },
    placeholderIllustration: {
        width: 200,
        height: 150,
        backgroundColor: '#E0F2F1', // Light teal/greyish
        borderRadius: 20,
        transform: [{ skewX: '-10deg' }], // Give it a bit of dynamic shape
        marginBottom: 20,
    },
    textContainer: {
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    titleOrange: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FF8C00', // Orange color
    },
    titleDark: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#004D40', // Dark teal/blue color
    },
    subtitle: {
        fontSize: 18,
        color: '#757575',
        marginTop: 8,
    },
});
