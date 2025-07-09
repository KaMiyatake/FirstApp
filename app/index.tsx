import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import { TasksProvider, useTasks } from '../hooks/useTasks';
import TaskItem from '../components/TaskItem';

function Home() {
  const { tasks, addTask, toggleTask, removeTask } = useTasks();
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      addTask(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add task"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <Button title="Add" onPress={handleAdd} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => removeTask(item.id)}
          />
        )}
        ListEmptyComponent={<Text>No tasks</Text>}
      />
    </View>
  );
}

export default function Index() {
  return (
    <TasksProvider>
      <Home />
    </TasksProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
    height: 40,
  },
});
