import { useReducer, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";
import { fetchFilteredContests } from "../utils/fetchFilteredContentes";

const initialState = {
  departmentChecked: false,
  latestChecked: false,
  periodChecked: false,
  onlineOfflineChecked: false,
  personalTeamChecked: false,
  customFilteringChecked: false,
  filteredVideos: [],
  latestVideos: [],
  periodVideos: [],
  activeFilter: "", // 활성화된 필터를 저장
};

function filterReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_FILTER":
      return { ...state, activeFilter: action.filterType };
    case "TOGGLE_DEPARTMENT":
      return { ...state, departmentChecked: !state.departmentChecked };
    case "TOGGLE_LATEST":
      return { ...state, latestChecked: !state.latestChecked };
    case "TOGGLE_PERIOD":
      return { ...state, periodChecked: !state.periodChecked };
    case "SET_FILTERED_VIDEOS":
      return { ...state, filteredVideos: action.payload };
    case "SET_LATEST_VIDEOS":
      return { ...state, latestVideos: action.payload };
    case "SET_PERIOD_VIDEOS":
      return { ...state, periodVideos: action.payload };
    default:
      return state;
  }
}

export function useFilterReducer() {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const handleSortByDepartment = async () => {
    dispatch({ type: "TOGGLE_DEPARTMENT" });
    try {
      const userResponse = await axiosInstance.get(
        "http://127.0.0.1:8000/users/me/",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      const userDepartment = userResponse.data.학과;
      const filteredResponse = await axiosInstance.get(
        `http://127.0.0.1:8000/contests/filtered/?연관학과=${userDepartment}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      dispatch({
        type: "SET_FILTERED_VIDEOS",
        payload: filteredResponse.data.results,
      });
    } catch (error) {
      console.error("Error sorting by department:", error);
    }
  };

  const handleSortByLatest = async () => {
    dispatch({ type: "TOGGLE_LATEST" });
    try {
      const data = await fetchFilteredContests("latest");
      dispatch({ type: "SET_LATEST_VIDEOS", payload: data });
    } catch (error) {
      console.error("Error sorting by latest:", error);
    }
  };

  const handleSortByPeriod = async () => {
    dispatch({ type: "TOGGLE_PERIOD" });
    try {
      const data = await fetchFilteredContests("prize");
      dispatch({ type: "SET_PERIOD_VIDEOS", payload: data });
    } catch (error) {
      console.error("Error sorting by period:", error);
    }
  };

  const handleFilterClick = (filterType) => {
    dispatch({ type: "SET_ACTIVE_FILTER", filterType });
    switch (filterType) {
      case "department":
        handleSortByDepartment();
        break;
      case "latest":
        handleSortByLatest();
        break;
      case "period":
        handleSortByPeriod();
        break;
      default:
        break;
    }
  };

  return {
    state,
    handleFilterClick,
  };
}
