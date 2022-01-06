/** Third-Party */
import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://vue-vuex-demo-default-rtdb.firebaseio.com",
});

export default journalApi;
