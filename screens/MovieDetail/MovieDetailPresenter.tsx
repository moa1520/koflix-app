import React, { useState } from "react";
import styled from "styled-components";
import { AppLoading } from "expo";
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Linking
} from "react-native";
import { BlurView } from "expo-blur";
import { collectionApi } from "../../api";
import Poster from "../../components/Poster";

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

const Bold = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: white;
`;

const Button = styled.TouchableOpacity`
  width: 80px;
  height: 35px;
  justify-content: center;
  align-items: center;
  background-color: rgb(20, 20, 20);
  border-radius: 5px;
  border: 1px solid rgb(50, 50, 50);
  margin-right: 10px;
`;

const SeriesPart = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
  justify-content: space-around;
`;

const PreviewPart = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const MovieDetailPresenter = ({ loading, data }) => {
  const [series, setSeries] = useState();
  const [seriesView, setSeriesView] = useState(false);
  const [preview, setPreview] = useState(false);

  const country = (nation: string): string => {
    switch (nation) {
      case "US":
        return "🇺🇸";
      case "KR":
        return "🇰🇷";
      case "CA":
        return "🇨🇦";
      case "JP":
        return "🇯🇵";
      case "BR":
        return "🇧🇷";
      case "AU":
        return "🇦🇺";
      case "DE":
        return "🇩🇪";
      case "GB":
        return "🇬🇧";
      default:
        return nation;
    }
  };

  const handleSeries = async () => {
    const { data: series } = await collectionApi.getCollection(
      data.belongs_to_collection.id
    );
    setSeries(series);
    setSeriesView(p => !p);
  };

  const handlePreview = () => {
    setSeriesView(false);
    setPreview(p => !p);
  };

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
                    width: 140,
                    height: 210,
                    resizeMode: "contain",
                    marginRight: 10,
                    borderRadius: 5
                  }}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${data.poster_path}`
                  }}
                />
                <View style={{ width: "60%" }}>
                  <Title
                    style={{
                      textShadowOffset: { width: 0.5, height: 0.5 },
                      textShadowColor: "black",
                      textShadowRadius: 2
                    }}
                  >
                    {data.title} •{" "}
                    {country(data.production_countries[0].iso_3166_1)}
                  </Title>
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
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  {data.belongs_to_collection && (
                    <Button onPress={handleSeries}>
                      <Bold
                        style={{
                          textShadowOffset: { width: 0.5, height: 0.5 },
                          textShadowColor: "black",
                          textShadowRadius: 2
                        }}
                      >
                        시리즈
                      </Bold>
                    </Button>
                  )}
                  <Button onPress={handlePreview}>
                    <Bold
                      style={{
                        textShadowOffset: { width: 0.5, height: 0.5 },
                        textShadowColor: "black",
                        textShadowRadius: 2
                      }}
                    >
                      예고편
                    </Bold>
                  </Button>
                </View>
                <SeriesPart>
                  {series &&
                    seriesView &&
                    series.parts.map((p: any) => <Poster key={p.id} {...p} />)}
                </SeriesPart>
                <PreviewPart>
                  {preview &&
                    data.videos.results.map((video: any, index: number) => (
                      <TouchableOpacity
                        key={video.id}
                        style={{
                          width: 100,
                          height: 40,
                          backgroundColor: "rgba(20, 20, 20, 0.7)",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 10,
                          marginTop: 10
                        }}
                        onPress={() => {
                          Linking.openURL(
                            `https://www.youtube.com/watch?v=${video.key}`
                          );
                        }}
                      >
                        <Bold>예고편 {index + 1}</Bold>
                      </TouchableOpacity>
                    ))}
                </PreviewPart>
              </View>
            </ScrollView>
          </BlurView>
        </Container>
      )}
    </Wrapper>
  );
};

export default MovieDetailPresenter;
