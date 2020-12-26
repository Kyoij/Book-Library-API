import { port } from "./config/index.config";
import Server from "./App";

const server = new Server(port);

server.start();
