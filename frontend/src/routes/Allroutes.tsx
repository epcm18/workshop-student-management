import { Route, Routes } from "react-router-dom"
import StudentTable from "../components/StudentTable"

export const AllRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<StudentTable/>}/>
            <Route path="/lecturers" element={<StudentTable/>}/>
        </Routes>
    )
}