const axios = require('axios');
const express = require('express');
const app = express();

const API = 'http://4.224.186.213/evaluation-service/notifications';

const data = [
  { ID: "1", Type: "Placement", Message: "AMD is hiring!", Timestamp: "2026-06-10 19:00:00" },
  { ID: "2", Type: "Placement", Message: "Goldman Sachs recruiting", Timestamp: "2026-06-10 18:45:00" },
  { ID: "3", Type: "Placement", Message: "Microsoft internship", Timestamp: "2026-06-10 18:15:00" },
  { ID: "4", Type: "Result", Message: "mid-sem results out", Timestamp: "2026-06-10 18:30:00" },
  { ID: "5", Type: "Result", Message: "project scores", Timestamp: "2026-06-10 17:49:00" },
  { ID: "6", Type: "Result", Message: "semester GPA", Timestamp: "2026-06-10 17:00:00" },
  { ID: "7", Type: "Event", Message: "farewell party", Timestamp: "2026-06-10 16:45:00" },
  { ID: "8", Type: "Event", Message: "tech fest", Timestamp: "2026-06-09 14:30:00" }
];
