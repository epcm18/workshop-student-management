import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import students from '../utils/StudentData.json'
import { Box, Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { useEffect, useState } from 'react';

export default function StudentTable() {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState()

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/allStudents`)
      .then((response) => {
        setStudentData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDeleteStudent = (id: string) => {
    axios
      .delete(`${BACKEND_URL}/delete/${id}`)
      .then((response) => {
        console.log("Post created successfully!");
      })
      .catch((err) => {
        console.log("Error creating post");
      });
  }

  const handleEditStudent = () => {
    axios
      .put(`${BACKEND_URL}/edit`, studentData)
      .then((response) => {
        console.log("Post created successfully!");
      })
      .catch((err) => {
        console.log("Error creating post");
      });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: 10 }}>
      <Grid container direction='row' spacing={2}>
        <Grid size={{ xs: 6, md: 4 }}>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h5"
          >
            <b>Students Table</b>
          </Typography>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }} paddingBottom={6} sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            style={{ justifyItems: 'right' }}
            variant="contained"
            onClick={() => {}}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '100%' }} aria-label="Student table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Lecturer</TableCell>
              <TableCell align="right">NIC</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.lecturer}</TableCell>
                <TableCell align="right">{row.nic}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align='right'>
                  <Stack direction='row' spacing={2} justifyContent={'right'} alignItems={'center'}>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditStudent()}>
                        <ModeEditOutlineIcon />
                      </IconButton>

                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteStudent(row.id)}>
                        <DeleteOutline />
                      </IconButton>

                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
