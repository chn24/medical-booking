import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Paper, Tab } from "@mui/material";
import { Box } from "@mui/system";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentTab from "./CommentTab";

export const DocIn4Context = createContext();

function InformationRight(props) {
  const navigate = useNavigate();
  const { docId } = props;
  const [tab, setTab] = useState("1");
  const [comments, setComments] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <DocIn4Context.Provider
      value={{ docId, comments, setComments, schedule, setSchedule }}
    >
      <Paper
        sx={{
          width: "98%",
          borderRadius: "15px",
        }}
      >
        <Box sx={{ width: "98%", typography: "body1" }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Schedule" value="1" />
                <Tab label="Comment" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"></TabPanel>
            <TabPanel value="2">
              <CommentTab />
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
    </DocIn4Context.Provider>
  );
}

export default InformationRight;
