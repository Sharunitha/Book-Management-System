/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmationDialog } from './ConfirmationDialog';
import { useSnackbar } from "notistack";


export const DeleteBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {enqueueSnackbar}=useSnackbar();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        navigate('/books');  // Navigate back if deletion is not confirmed
    };

    const handleConfirm = () => {
        axios.delete(`http://localhost:3000/book/book/${id}`)
            .then(res => {
                if (res.data.deleted) {
                    enqueueSnackbar("Book deleted Sucessfully",{variant:'success'})
                    navigate('/books');
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        setOpen(true);
    }, [id]);

    return (
        <ConfirmationDialog
            open={open}
            onClose={handleClose}
            onConfirm={handleConfirm}
        />
    );
};
