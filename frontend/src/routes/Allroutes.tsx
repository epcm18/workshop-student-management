import { Route, Routes } from "react-router-dom"
import StudentTable from "../components/StudentTable"
import { ToDo } from "../components/ToDo"

export const AllRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<StudentTable/>}/>
            <Route path="/lecturers" element={<ToDo/>}/>
        </Routes>
    )
}