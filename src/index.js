import { createGameboardGrid } from "./domHelpers.js";
import "./styles.css";

const realBoard = document.querySelector(".real");
createGameboardGrid(1, realBoard);
