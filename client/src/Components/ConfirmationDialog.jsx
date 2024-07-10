import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
  <Dialog open={open} onClose={onClose} >
       <DialogTitle>Confirm Deletion</DialogTitle>

       <DialogContent>
            <DialogContentText sx={{color:"black",fontWeight:"bold"}}>
                 Do you really want to delete this book?
            </DialogContentText>
       </DialogContent>

       <DialogActions>
          <Button onClick={onClose} sx={{ color: 'white', backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}> Cancel </Button>
          <Button onClick={onConfirm} sx={{ color: 'white', backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Delete</Button>
       </DialogActions>
  </Dialog>
  )
}
ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };
