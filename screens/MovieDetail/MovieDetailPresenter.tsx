import React from "react";
import styled from "styled-components";
import { AppLoading } from "expo";
import { ScrollView, Image, View } from "react-native";
import { BlurView } from "expo-blur";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(20, 20, 20, 1);
`;

const Text = styled.Text`
  color: white;
`;

const Container = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const Info = styled.Text`
  color: white;
  opacity: 0.7;
  margin-top: 10px;
`;

const Overview = styled.Text`
  color: white;
  margin-top: 10px;
`;

const MovieDetailPresenter = ({ loading, data }) => {
  return (
    <Wrapper>
      {loading ? (
        <AppLoading />
      ) : (
        <Container
          source={{
            uri: `https://image.tmdb.org/t/p/original${data.backdrop_path}`
          }}
          imageStyle={{ opacity: 0.5, resizeMode: "cover" }}
        >
          <BlurView tint="dark" intensity={70}>
            <ScrollView style={{ width: "100%", height: "100%", padding: 15 }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    width: 150,
                    height: 230,
                    resizeMode: "contain",
                    marginRight: 10
                  }}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${data.poster_path}`
                  }}
                />
                <View style={{ width: "60%" }}>
                  <Title>{data.title}</Title>
                  <Info>
                    {data.release_date.substring(0, 4)} • {data.runtime}분 •{" "}
                    {data.genres.map((element: object, index: number) =>
                      index === data.genres.length - 1
                        ? element["name"]
                        : `${element["name"]} / `
                    )}
                  </Info>
                  <Overview>{data.overview}</Overview>
                </View>
              </View>
            </ScrollView>
          </BlurView>
        </Container>
      )}
    </Wrapper>
  );
};

export default MovieDetailPresenter;
