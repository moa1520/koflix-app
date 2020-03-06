import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { AppLoading } from "expo";
import { tvApi } from "../api";
import TVPoster from "../components/TVPoster";

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

function TV() {
  const [topRated, setTopRated] = useState();
  const [airingToday, setAiringToday] = useState();
  const [popular, setPopular] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const {
        data: { results: topRated }
      } = await tvApi.topRated();
      const {
        data: { results: airingToday }
      } = await tvApi.airingToday();
      const {
        data: { results: popular }
      } = await tvApi.popular();
      setTopRated(topRated);
      setAiringToday(airingToday);
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
              <Bold>Top Rated</Bold>
              <Container>
                {topRated.map((p: any) => (
                  <TVPoster key={p.id} {...p} />
                ))}
              </Container>
            </Section>
            <Section>
              <Bold>Popular</Bold>
              <Container>
                {popular.map((p: any) => (
                  <TVPoster key={p.id} {...p} />
                ))}
              </Container>
            </Section>
            <Section>
              <Bold>Airing Today</Bold>
              <Container>
                {airingToday.map((p: any) => (
                  <TVPoster key={p.id} {...p} />
                ))}
              </Container>
            </Section>
          </>
        )}
      </ScrollView>
    </View>
  );
}

export default TV;
