import axios from "axios";
import { stringify } from "qs";

const request = ({
  method,
  path,
  query,
  data,
  params,
}: {
  method: "get" | "post";
  path: string;
  data?: any;
  query?: any;
  params?: any;
}) => {
  return axios({
    method,
    data,
    url: `${path}${query ? `?${stringify(query)}` : ""}`,
    ...params,
  }).catch((error) => {
    throw error;
  });
};

export const get = (path: string, query?: any, params?: any) =>
  request({
    path,
    method: "get",
    query,
    params,
  });

export const post = (path: string, data: any, query?: any, params?: any) =>
  request({
    path,
    data,
    method: "post",
    query,
    params,
  });

export const getProducts = (page_index: number) => {
  return get(
    `https://raw.githubusercontent.com/joakim-starship/case-study-item-selection/main/items/${page_index}.json`
  );
};
