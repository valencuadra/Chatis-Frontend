import {io} from "socket.io-client";
import React from "react";
const SOCKET_URL = "https://chatix-backend-production.up.railway.app/";

export const socket = io(SOCKET_URL)

//contexto
export const AppContext = React.createContext();