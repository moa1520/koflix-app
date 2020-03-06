import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { AppLoading } from "expo";
import Poster from "../../components/Poster";
import TVPoster from "../../components/TVPoster";

const Text = styled.Text`
  color: white;
`;

const Section = styled.View`
  margin-bottom: 15px;
`;

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Bold = styled.Text`
  color: white;
  font-weight: 600;
`;

const SearchPresenter = ({ loading, movieResults, tvResults }) => {
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
          movieResults &&
          tvResults && (
            <>
              <Section>
                <Bold>영화</Bold>
                <Container>
                  {movieResults.map((p: any) => (
                    <TouchableOpacity key={p.id}>
                      <Poster {...p} />
                    </TouchableOpacity>
                  ))}
                </Container>
              </Section>
              <Section>
                <Bold>TV</Bold>
                <Container>
                  {tvResults.map((p: any) => (
                    <TouchableOpacity key={p.id}>
                      <TVPoster {...p} />
                    </TouchableOpacity>
                  ))}
                </Container>
              </Section>
            </>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default SearchPresenter;
