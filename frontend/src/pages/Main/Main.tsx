import { Stack } from "@mui/material";
import FullCourseCardList from "../../components/Main/FullCourseCardList";
import MainBackground from "../../components/Main/MainBackgroundCarousel";
import MyFullCourse from "../../components/Main/MyFullCourse/MyFullCourse";
import PlaceCardList from "../../components/Main/PlaceCardList";
import { connect } from "react-redux";
import { AccountReducer } from "../../redux/rootReducer";
import { customAxios } from "../../lib/customAxios";
import { useEffect, useState } from "react";
import { errorControl, loadingControl } from "../../redux/baseInfo/actions";

function Main({ isLogin, userId, errorControl, loadingControl }: Props) {
  const [attrationList, setAttrationList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [popularFullCourseList, setPopularFullCourseList] = useState([]);
  const [myFullCourseList, setMyFullCourseList] = useState([]);

  const getRestaurantRecommend = async () => {
    loadingControl(true);
    try {
      const res = await customAxios({
        method: "get",
        url: `place/restaurant/${isLogin ? "mainRecommend" : "popular"}`,
      });
      setRestaurantList(res.data);
    } catch (e) {
      errorControl("음식점 정보를 불러오는데 실패했습니다.");
    }
    loadingControl(false);
  };

  const getAttrationRecommend = async () => {
    loadingControl(true);
    try {
      const res = await customAxios({
        method: "get",
        url: `place/attraction/${isLogin ? "mainRecommend" : "popular"}`,
      });
      setAttrationList(res.data);
    } catch (e) {
      errorControl("관광지 정보를 불러오는데 실패했습니다.");
    }
    loadingControl(false);
  };

  const getPopularFullCourse = async () => {
    loadingControl(true);
    try {
      const res = await customAxios({
        method: "get",
        url: "fullCourse/popular",
      });
      setPopularFullCourseList(res.data);
    } catch (e) {
      errorControl("풀코스 정보를 불러오는데 실패했습니다.");
    }
    loadingControl(false);
  };

  const getMyFullCourse = async () => {
    loadingControl(true);
    try {
      const res = await customAxios({
        method: "get",
        url: `/users/${userId}/userFullCourse`,
        params: {
          page: 0,
          size: 4,
        },
      });
      setMyFullCourseList(res.data.content);
    } catch (e) {}
    loadingControl(false);
  };

  const getInfo = () => {
    getRestaurantRecommend();
    getAttrationRecommend();
    getPopularFullCourse();
    if (isLogin) {
      getMyFullCourse();
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <Stack spacing={10}>
        {isLogin && myFullCourseList.length > 0 ? (
          <MyFullCourse fullCourseDetailList={myFullCourseList}></MyFullCourse>
        ) : (
          <MainBackground></MainBackground>
        )}
        <FullCourseCardList
          fullCourseList={popularFullCourseList}
          title="인기 풀코스"
        ></FullCourseCardList>
        <PlaceCardList placeList={attrationList} title="관광지"></PlaceCardList>
        <PlaceCardList placeList={restaurantList} title="맛집"></PlaceCardList>
      </Stack>
    </>
  );
}

const mapStateToProps = ({ account, baseInfo }: AccountReducer) => ({
  isLogin: account.isLogin,
  userId: account.userId,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    errorControl: (errMessage: string) => errorControl(dispatch, errMessage),
    loadingControl: (nowLoading: boolean) =>
      loadingControl(dispatch, nowLoading),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Main);
