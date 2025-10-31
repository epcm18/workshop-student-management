import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { Toast } from "./Toast";

export default function AddStudent() {
  const [open, setOpen] = React.useState(false);
  const [lecturer, setLecturer] = React.useState<string>("");
  const [lecturerList, setLecturerList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/lecturer/allLecturers`)
      .then((response) => {
        setLecturerList(response.data);
        setLoading(false);
        console.log("lecturers => ", response.data);
      })
      .catch((err) => {
        setErrors(err.message);
        setLoading(false);
      });
  }, []);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setName("");
    setEmail("");
    setLecturer("");
    setErrors({});
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
    } else {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "Full Name is required";
    if (!lecturer) newErrors.lecturer = "Lecturer is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;
    // Basic check for dropdown
    if (!lecturer) {
      const label = document.getElementById("lecturer-label");
      label?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const formData = new FormData(event.currentTarget);
    console.log("formData => ", formData);
    // Add the controlled select value to the form data
    // formData.set("lecturer", selectedLecturer);

    const data = Object.fromEntries(formData.entries());

    const payLoad = {
      name: data.name,
      email: data.email,
      lecturer: {
        id: data.lecturer,
      },
    };
    console.log("Submitted:", payLoad);

    axios
      .post(`${BACKEND_URL}/student/add`, payLoad)
      .then((response) => {
        console.log("lecturers => ", response.data);
        setToastMessage("Successfully added");
        setOpenToast(true);
      })
      .catch((err) => {
        setErrors(err.message);
        setLoading(false);
        setToastMessage(err.message);
        setOpenToast(true);

      });

    handleClose();
    (event.currentTarget as HTMLFormElement).reset();
  };

  const isAddDisabled = !name || !email || !lecturer || !!errors.email;

  return (
    <React.Fragment>
      <Toast open={openToast} setOpen={setOpenToast} message={toastMessage} />
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
                id="name"
                name="name"
                label="Full Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
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
                value={email}
                onChange={handleEmailChange}
                error={!!errors.email}
                helperText={errors.email}
              />

              {/* Lecturer dropdown */}
              <FormControl
                variant="standard"
                required
                fullWidth
                margin="dense"
                error={!!errors.lecturer}
              >
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
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            form="add-student-form"
            disabled={isAddDisabled}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
