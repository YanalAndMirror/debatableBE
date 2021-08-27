import axios from "axios";
import { OPENVIDU_SERVER_SECRET, OPENVIDU_SERVER_URL } from "../ovKey";
const https = require("https");

exports.openViduToken = async (req, res) => {
  try {
    if (req.body.room) res.status(201).json(await createToken(req.body.room));
    else res.status(404).json("error");
  } catch (e) {
    res.status(404).json("error");
  }
};
const createToken = async (sessionId) => {
  const data = JSON.stringify({ customSessionId: sessionId });
  let startSession;
  try {
    startSession = await axios.post(
      OPENVIDU_SERVER_URL + "/openvidu/api/sessions",
      data,
      {
        headers: {
          Authorization:
            "Basic " +
            btoaImplementation("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    startSession = { data: { id: sessionId } };
  }

  const getToken = await axios.post(
    OPENVIDU_SERVER_URL +
      "/openvidu/api/sessions/" +
      startSession.data.id +
      "/connection",
    {},
    {
      headers: {
        Authorization:
          "Basic " +
          btoaImplementation("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
        "Content-Type": "application/json",
      },
    }
  );
  return getToken.data.token;
};
const btoaImplementation = (str) => {
  try {
    return btoa(str);
  } catch (err) {
    return Buffer.from(str).toString("base64");
  }
};
