import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../hooks/useTasks';

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onToggle} style={styles.textContainer}>
        <Text style={[styles.text, task.done && styles.done]}>{task.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>×</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  delete: {
    paddingHorizontal: 8,
    fontSize: 16,
    color: 'red',
  },
});
