import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import students from '../utils/StudentData.json'
import { IconButton, Stack, Tooltip } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

export default function StudentTable() {
  return (
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
                    <IconButton>
                      <ModeEditOutlineIcon />
                    </IconButton>

                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton>
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
  );
}
