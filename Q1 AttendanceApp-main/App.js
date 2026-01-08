import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const students = [
  'Ahmad',
  'Fatima',
  'Ali',
  'Ayesha',
  'Hassan',
  'Zainab',
  'Bilal',
  'Maryam',
  'Usman',
  'Hira',
];

const subjects = ['Math', 'Science', 'Islamiyat'];

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  // Format date to "YYYY-MM-DD" string
  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle attendance: store attendance by student -> subject -> date -> status
  const handleAttendance = (student, status) => {
    setAttendance((prev) => {
      const studentData = prev[student] || {};
      const subjectData = studentData[selectedSubject] || {};
      const dateKey = formatDate(date);

      return {
        ...prev,
        [student]: {
          ...studentData,
          [selectedSubject]: {
            ...subjectData,
            [dateKey]: status,
          },
        },
      };
    });
  };

  // Calculate attendance percentage for selectedSubject
  const calculatePercentage = (student) => {
    const subjectData = attendance[student]?.[selectedSubject] || {};
    const records = Object.values(subjectData);
    if (records.length === 0) return 0;
    const presentCount = records.filter((status) => status === 'P').length;
    return ((presentCount / records.length) * 100).toFixed(0);
  };

  // Button styles based on status
  const getButtonStyle = (type) => {
    switch (type) {
      case 'P':
        return { backgroundColor: '#3b82f6' };
      case 'A':
        return { backgroundColor: '#ef4444' };
      case 'L':
        return { backgroundColor: '#facc15' };
      default:
        return {};
    }
  };

  const getAttendanceRecordForStudent = (student) => {
    return attendance[student]?.[selectedSubject] || {};
  };

  const closeModal = () => setSelectedStudent(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📋 Attendance App</Text>

        <View style={styles.subjectsContainer}>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject}
              onPress={() => setSelectedSubject(subject)}
              style={[
                styles.subjectButton,
                selectedSubject === subject && styles.subjectSelected,
              ]}
            >
              <Text
                style={{
                  color: selectedSubject === subject ? 'white' : '#1e3a8a',
                  fontWeight: 'bold',
                }}
              >
                {subject}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateButtonText}>📅 {formatDate(date)}</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_e, selected) => {
            setShowDatePicker(false);
            if (selected) setDate(selected);
          }}
        />
      )}

      {/* Students list */}
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={students}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedStudent(item)}
            style={styles.studentRow}
          >
            <Text style={styles.studentName}>{item}</Text>
            <View style={styles.actionsContainer}>
              <View style={styles.buttonsContainer}>
                {['P', 'A', 'L'].map((status) => (
                  <TouchableOpacity
                    key={status}
                    onPress={() => handleAttendance(item, status)}
                    style={[styles.statusButton, getButtonStyle(status)]}
                  >
                    <Text style={styles.statusButtonText}>{status}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.percentage}>{calculatePercentage(item)}%</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal for selected student's attendance history */}
      <Modal
        visible={selectedStudent !== null}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {selectedStudent} - {selectedSubject} Attendance
          </Text>

          <ScrollView style={styles.modalContent}>
            {selectedStudent &&
              Object.entries(getAttendanceRecordForStudent(selectedStudent))
                .sort(([dateA], [dateB]) => (dateA > dateB ? -1 : 1))
                .map(([dateKey, status]) => (
                  <View key={dateKey} style={styles.recordRow}>
                    <Text style={styles.recordDate}>{dateKey}</Text>
                    <Text style={[styles.recordStatus, getButtonStyle(status)]}>
                      {status}
                    </Text>
                  </View>
                ))}

            {selectedStudent &&
              Object.keys(getAttendanceRecordForStudent(selectedStudent)).length ===
                0 && (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                  No attendance records for this subject yet.
                </Text>
              )}
          </ScrollView>

          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 10,
  },
  subjectsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  subjectButton: {
    borderWidth: 1,
    borderColor: '#1e3a8a',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  subjectSelected: {
    backgroundColor: '#1e3a8a',
  },
  dateButton: {
    alignSelf: 'center',
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#1e3a8a',
    borderRadius: 8,
  },
  dateButtonText: {
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  studentRow: {
    backgroundColor: '#f9fafb',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  percentage: {
    fontWeight: 'bold',
    color: '#2563eb',
    minWidth: 35,
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
  },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.8,
    borderBottomColor: '#ddd',
  },
  recordDate: {
    fontSize: 16,
    color: '#333',
  },
  recordStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    borderRadius: 4,
    color: 'white',
    minWidth: 30,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#1e3a8a',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
