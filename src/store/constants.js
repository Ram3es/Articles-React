import { actionConstantsCreator } from "../utils";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4001/api",
});

const ARTICLES = [
  "FETCH_ARTICLES",
  "FETCH_ARTICLE",
  "EDIT_ARTICLE",
  "REMOVE_ARTICLE",
  "ADD_ARTICLE",
];

const AUTH = [
  "SIGN_IN",
  "SIGN_UP",
  "RESET",
  "ACTIVATION",
  "FORGOT",
  "ACCOUNT_LINK_SEND",
];

const USER = ["FETCH_USER"];

const COUNT = ["INKREMENT"];

const SORT = ["UPDATE_ADVANCED_SEARCH"];

export const compose = [...ARTICLES, ...USER, ...COUNT, ...SORT, ...AUTH];
export const constants = actionConstantsCreator(compose);
