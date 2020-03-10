import React, { useState } from "react";
import styled from "styled-components";
import { AppLoading } from "expo";
import { BlurView } from "expo-blur";
import { ScrollView, View, Image } from "react-native";
import { collectionApi } from "../../api";
import TVPoster from "../../components/TVPoster";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(20, 20, 20, 1);
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

const Bold = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const SeasonPart = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const LastPart = styled.View``;

const TVDetailPresenter = ({ loading, data }) => {
  const [seasonsView, setSeasonsView] = useState(false);
  const [lastView, setLastView] = useState(false);

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

  const handleSeasons = () => {
    setSeasonsView(p => !p);
    setLastView(false);
  };
  const handleLast = () => {
    setLastView(p => !p);
    setSeasonsView(false);
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
            <ScrollView
              style={{
                width: "100%",
                height: "100%",
                paddingVertical: 10,
                paddingHorizontal: 5
              }}
            >
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
                    {data.name} • {country(data.origin_country[0])}
                  </Title>
                  <Info>
                    {data.last_air_date && data.last_air_date.substring(0, 4)} •{" "}
                    {data.episode_run_time[0]}분 •{" "}
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
                  {data.seasons && (
                    <Button onPress={handleSeasons}>
                      <Bold
                        style={{
                          textShadowOffset: { width: 0.5, height: 0.5 },
                          textShadowColor: "black",
                          textShadowRadius: 2
                        }}
                      >
                        시즌
                      </Bold>
                    </Button>
                  )}
                  <Button onPress={handleLast}>
                    <Bold
                      style={{
                        textShadowOffset: { width: 0.5, height: 0.5 },
                        textShadowColor: "black",
                        textShadowRadius: 2
                      }}
                    >
                      마지막 화
                    </Bold>
                  </Button>
                </View>
                <SeasonPart>
                  {seasonsView &&
                    data.seasons.map((season: any) => (
                      <TVPoster
                        key={season.id}
                        {...season}
                        id={data.id}
                        name={data.name}
                      />
                    ))}
                </SeasonPart>
                <LastPart>
                  {lastView && (
                    <>
                      <Image
                        style={{
                          width: "100%",
                          height: 220,
                          resizeMode: "contain"
                        }}
                        source={{
                          uri: `https://image.tmdb.org/t/p/original${data.last_episode_to_air.still_path}`
                        }}
                      />
                      <Bold>
                        {data.last_episode_to_air.name} • ⭐
                        {data.last_episode_to_air.vote_average} / 10
                      </Bold>
                      <Overview>
                        {data.last_episode_to_air.air_date
                          .replace("-", "년 ")
                          .replace("-", "월 ")}
                        일 • {data.last_episode_to_air.episode_number}화
                      </Overview>
                    </>
                  )}
                </LastPart>
              </View>
            </ScrollView>
          </BlurView>
        </Container>
      )}
    </Wrapper>
  );
};

export default TVDetailPresenter;
