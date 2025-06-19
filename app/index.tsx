import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Button,
    FlatList,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

interface Message {
  text: string;
  timestamp?: string;
}

const BACKEND_URL = Platform.select({
  ios: 'http://localhost:4000',
  android: 'http://10.0.2.2:4000',
  default: 'http://localhost:4000',
});

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error('Erreur fetch:', (err as Error).message);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(`${BACKEND_URL}/messages`, { text });
      setText('');
      fetchMessages();
    } catch (err) {
      console.error('Erreur envoi:', (err as Error).message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>💬 Mini Chat Mobile</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Ton message..."
          onChangeText={setText}
        />
        <Button title="Envoyer" onPress={handleSend} />
      </View>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: { flex: 1, borderColor: '#ccc', borderWidth: 1, padding: 10, borderRadius: 5 },
  message: { backgroundColor: '#eee', padding: 10, borderRadius: 5, marginBottom: 5 },
});
