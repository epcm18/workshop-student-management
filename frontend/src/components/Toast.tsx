import { Snackbar } from "@mui/material"

export const Toast = ({open, setOpen, message} : {open: boolean, setOpen: (r: boolean) => void, message: string}) => {

    const handleClose = () => (
        setOpen(false)
    )
    return(
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      />
    )
}