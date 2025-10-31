import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddStudent from "./AddStudent";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { useEffect, useState } from "react";

export default function StudentTable() {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/student/allStudents`)
      .then((response) => {
        setStudentData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: 10,
        width: "100%",
        alignItems: 'stretch'
      }}
    >
      <Grid container direction="row" spacing={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid size={{ xs: 6, md: 8 }} sx={{ textAlign: "left" }}>
          <Typography sx={{ flex: "1 1 100%" }} variant="h5">
            <b>Students Table</b>
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 6, md: 4 }}
          paddingBottom={6}
          sx={{ display: "flex", justifyContent: "right" }}
        >
          <AddStudent/>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="Student table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Lecturer</TableCell>
              <TableCell align="right">Email</TableCell>
              {/*
                ##TODO - Add NIC and Phone-number fields
              */}
              <TableCell align="right">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.length > 0 ? (
              studentData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.lecturer.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  {/*
                    ##TODO - Add NIC and Phone-number fields
                  */}
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="right"
                      alignItems="center"
                    >
                      <Tooltip title="Edit">
                        {/*
                          ##TODO - Add handleStudentEdit function to edit a student
                        */}
                        <IconButton>
                          <ModeEditOutlineIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        {/*
                          ##TODO - Add handleStudentDelete function to delete a student
                        */}
                        <IconButton>
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No students available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
