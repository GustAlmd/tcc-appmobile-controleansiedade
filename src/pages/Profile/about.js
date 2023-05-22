import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const developers = [
  {
    name: 'João',
    expertise: 'React Native',
    experience: '5 anos',
  },
  {
    name: 'Maria',
    expertise: 'JavaScript',
    experience: '3 anos',
  },
  {
    name: 'Pedro',
    expertise: 'UI/UX Design',
    experience: '2 anos',
  },
];

const DeveloperInfo = ({ name, expertise, experience }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.expertise}>{expertise}</Text>
    <Text style={styles.experience}>{experience} de experiência</Text>
  </View>
);

const DevelopersPage = () => (
  <View style={styles.pageContainer}>
    <Text style={styles.title}>Desenvolvedores</Text>
    {developers.map((developer, index) => (
      <DeveloperInfo key={index} {...developer} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  expertise: {
    fontSize: 16,
    marginBottom: 5,
  },
  experience: {
    fontSize: 14,
    color: '#888888',
  },
});

export default DevelopersPage;

