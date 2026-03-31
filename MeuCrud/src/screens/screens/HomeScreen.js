import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { TextInput } from "react-native";

import styles from "../styles/styles";

import { getPeople, deletePerson } from "../services/peopleCrud";

export default function HomeScreen({ navigation }) {

  // estado da lista
  const [people, setPeople] = useState([]);

  // função para carregar dados
  async function loadPeople() {
    const data = await getPeople();
    setPeople(data);
  }

  // executa ao abrir tela
  useEffect(() => {
    loadPeople();
  }, []);

  function CardPersonal ({item, navigation, refresh}){
    return(

        <View style={styles.card}>

        <View>

        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>

        <Text style={styles.email}>
           {item.email}
        </Text>

        <Text style={styles.phone}>
           {item.phone}
        </Text>

      </View>

      <View>
        <Button
          title="Editar"
          onPress={()=> navigation.navigate("AddEdit", {person:item})}
        />

        <Button
          title="Deletar"
          onPress={async ()=>{
          await deletePerson(item.id);
          refresh();
          }}
        />

      </View>
    </View>
    )
  }

    const [search, setSearch] = useState(""); //armazena o texto digitado na busca

    const normalizedSearch = search.trim().toLowerCase(); //normaliza o texto na busca, deixa tudo muinusculo
    // e remove espaços no começo e final
     const filteredPeople = !normalizedSearch //cria a lista filtrada 
    ? people //se não tiver nada digitado, retorna toda a lista
    : people.filter((people) => { //se tiver busca, filtra a lista
        const firstName = (people.firstName || "").toLowerCase(); 
        const lastName = (people.lastName || "").toLowerCase(); 
        const fullName = `${firstName} ${lastName}`.trim(); //permite buscar pelo nome completo
        const email = (people.email || "").toLowerCase();
        const phone = (people.phone || "").toLowerCase();
        //pega o primeiro nome, ultimo nome, email e telefone e deixa tudo minusculo

        return ( //verifica se o texto buscado está presente em algum campo
          firstName.includes(normalizedSearch) ||
          lastName.includes(normalizedSearch) ||
          fullName.includes(normalizedSearch) ||
          email.includes(normalizedSearch) ||
          phone.includes(normalizedSearch)
        );
      });
    

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Pessoas</Text>

      <Button
        title="Adicionar Pessoa"
        onPress={() => navigation.navigate("AddEdit")}
      />

      <TextInput
      placeholder="Buscar pessoa.."
      value={search}
      onChangeText={setSearch}
      style={styles.searchInput}
      />  

      <FlatList
        data={filteredPeople}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardPersonal
            item={item}
            navigation={navigation}
            refresh={loadPeople}
          />
        )}
      />

    </View>
  );
}