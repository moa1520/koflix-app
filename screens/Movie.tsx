import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { AppLoading } from "expo";
import { moviesApi } from "../api";
import Poster from "../components/Poster";

const Bold = styled.Text`
  color: white;
  font-weight: 600;
`;

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Section = styled.View`
  margin-bottom: 15px;
`;

function Movie({ navigation }) {
  const [nowPlaying, setNowPlaying] = useState();
  const [upcoming, setUpcoming] = useState();
  const [popular, setPopular] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const {
        data: { results: nowPlaying }
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming }
      } = await moviesApi.upcoming();
      const {
        data: { results: popular }
      } = await moviesApi.popular();
      setNowPlaying(nowPlaying);
      setUpcoming(upcoming);
      setPopular(popular);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(20,20,20,1)",
        paddingTop: 10,
        paddingHorizontal: 10
      }}
    >
      <ScrollView>
        {loading ? (
          <AppLoading />
        ) : (
          <>
            <Section>
              <Bold>Now Playing</Bold>
              <Container>
                {nowPlaying.map(p => (
                  <Poster key={p.id} {...p} />
                ))}
              </Container>
            </Section>
            <Section>
              <Bold>Upcoming</Bold>
              <Container>
                {upcoming.map((p: any) => (
                  <Poster key={p.id} {...p} />
                ))}
              </Container>
            </Section>
            <Section>
              <Bold>Popular</Bold>
              <Container>
                {popular.map((p: any) => (
                  <Poster key={p.id} {...p} />
                ))}
              </Container>
            </Section>
          </>
        )}
      </ScrollView>
    </View>
  );
}

export default Movie;
