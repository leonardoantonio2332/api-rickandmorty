import { useQuery } from "@apollo/client";
import INFO_PERSON from "./querys/index";
import { Input, Button, HStack } from '@chakra-ui/react'
import React, { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import "./App.css";

function App() {
    const [characters, setCharacters] = React.useState([]);
    const [page, setPage] = React.useState(1);
    console.log("🚀 ~ file: App.jsx ~ line 12 ~ App ~ page", page)
    const { loading, error, data, fetchMore } = useQuery(INFO_PERSON, {variables: {page}});
    console.log("🚀 ~ file: App.jsx ~ line 14 ~ App ~ data", data)


  useEffect(() => {
    if (data) {
      setCharacters([...characters, ...data.characters.results]);
    }
  },[data])

  useEffect(() => {
    if (page > 1) {
      fetchMore({
        variables: {
          page
        }
      })
    }
  },[page])

//   if (loading) {
//     return <p>Is Loading...</p>;
//   }

  if (error) {
    return <p>Ocorreu um erro...</p>;
  }

   const genderTranslate = {
    'Male': 'Masculino',
    'Female': 'Feminino',
    'Unknown': 'Desconhecido',
    'Genderless': 'Não Binário'
  }

  const translateSpecies = (species) => {
    if (species === "Human") {
      return "Humano";
    } else if (species === "Alien") {
      return "Alien";
    } else {
      return "Desconhecido";
    }
  }

  return (
    <div>
        <HStack spacing="2px" w="full" justifyContent="center">
            <Input placeholder="Pesquisar" />
            <Button colorScheme="teal" variant="outline">Pesquisar</Button>
        </HStack>
      <InfiniteScroll
        dataLength={data?.characters?.info?.count || 0}
        next={() => setPage(page + 1)}
        hasMore={characters.length < data?.characters?.info?.count}
        loader={<h4>Loading...</h4>}
        endMessage={
            <p style={{ textAlign: 'center' }}>
            <b>Isso é tudo pessoal KKK</b>
            </p>
        }
        >
                <section className="parent">
        {characters.map((person, index) => (
        <div className="card" key={person.name}>
          <img src={person.image} alt="Avatar" style={{ width: "100%" }} />
          <div className="container">
            <h4>
              <b>{person.name}</b>
            </h4>
            <p>
              <b>Gênero:</b> {genderTranslate[person.gender]}
            </p>
            <p>
              <b>Espécie:</b> {translateSpecies(person.species)}
            </p>
          </div>
        </div>
      ))}
    </section>
        </InfiniteScroll>
        </div>
  );
}

export default App;