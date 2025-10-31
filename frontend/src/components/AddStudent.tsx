import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';

export default function AddStudent() {
    const [open, setOpen] = React.useState(false);
    const [lecturer, setLecturer] = React.useState<string>("");
    const [lecturerList, setLecturerList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/lecturer/allLecturers`)
            .then((response) => {
                setLecturerList(response.data);
                setLoading(false);
                console.log("lecturers => ", response.data)
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setLecturer("");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Basic check for dropdown
        if (!lecturer) {
            const label = document.getElementById("lecturer-label");
            label?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        const formData = new FormData(event.currentTarget);
        console.log("formData => ", formData)
        // Add the controlled select value to the form data
        // formData.set("lecturer", selectedLecturer);

        const data = Object.fromEntries(formData.entries());
        
        const payLoad = {
            id: data.id,
            name: data.name,
            email: data.email,
            lecturer: {
                id: data.lecturer
            }
        }
        console.log('Submitted:', payLoad);
        
        axios.post(`${BACKEND_URL}/student/add`, payLoad)
            .then((response) => {
                console.log("lecturers => ", response.data)
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

        handleClose();
        (event.currentTarget as HTMLFormElement).reset();
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Student
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 1 }}>
                        Add new student details below.
                    </DialogContentText>

                    <form onSubmit={handleSubmit} id="add-student-form" noValidate>
                        <Stack spacing={1}>
                            <TextField
                                required
                                margin="dense"
                                id="id"
                                name="id"
                                label="Student ID"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                required
                                margin="dense"
                                id="name"
                                name="name"
                                label="Full Name"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                required
                                margin="dense"
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                            />

                            {/* Lecturer dropdown */}
                            <FormControl variant="standard" required fullWidth margin="dense">
                                <InputLabel id="lecturer-label">Lecturer</InputLabel>
                                <Select
                                    labelId="lecturer-label"
                                    id="lecturer"
                                    value={lecturer}
                                    onChange={(e) => setLecturer(String(e.target.value))}
                                    label="Lecturer"
                                >
                                    {lecturerList.map((lecturer) => (
                                        <MenuItem value={lecturer.id}>{lecturer.name}</MenuItem>
                                    ))}
                                </Select>
                                <input type="hidden" name="lecturer" value={lecturer} />
                            </FormControl>
                        </Stack>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="add-student-form">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
