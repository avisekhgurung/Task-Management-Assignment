import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const ManageTodo = ({ handleClose, open, setTodosChange, edit=false, editData = null}) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        control
    } = useForm();

      useEffect(() => {
        if(edit) {
        setValue('title', editData?.title)
        setValue("description",  editData?.description )
        setValue("priority",  editData?.priority )
        setValue("dueDate",  editData?.due_date )
        }
      },[])

      const onSubmitForm = async data => {
        try {
            if(edit) {
                const {title, description , priority, dueDate} = data
                const myHeaders = new Headers();
          
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("jwt_token", localStorage.token);

                const body = {
                    title: title,
                    description: description,
                    priority: priority,
                    due_date: dueDate
                  };
          
                await fetch(`http://localhost:5000/dashboard/todos/${editData?.todo_id}`, {
                  method: "PUT",
                  headers: myHeaders,
                  body: JSON.stringify(body),
                });
                reset()
                handleClose()
                toast.success("Task edited successfully")
                setTodosChange(true);
            } else {
                const myHeaders = new Headers();
                const {title, description , priority, dueDate} = data
          
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("jwt_token", localStorage.token);
          
                const body = {
                  title: title,
                  description: description,
                  priority: priority,
                  due_date: dueDate
                };
                const response = await fetch("http://localhost:5000/dashboard/todos", {
                  method: "POST",
                  headers: myHeaders,
                  body: JSON.stringify(body)
                });
                
                const parseResponse = await response.json();
                setTodosChange(true);
                reset()
                handleClose()
                toast.success("Task created successfully")
            }
          
        } catch (err) {
          console.error(err.message);
        }
      };
    const top100Films = [
        'High',
        'Moderate',
        'Low'
    ]

    const currentDate = new Date().toISOString().slice(0, 10);

    return (
        <Dialog maxWidth="md" open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <DialogTitle sx={{backgroundColor: '#1976d2', color:'white', fontWeight: 'bold'}}>{edit ? `Edit Task - ${editData?.title}` : 'Add Task'}</DialogTitle>
                <DialogContent sx={{
                    height: "400px", // Set your desired height value
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    width: '500px',
                    marginTop: '20px'
                }} >
                 
                    <TextField
                        autoFocus
                        margin="dense"
                        id="text"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        {...register('title', { required: 'Title is required' })}
                        error={Boolean(errors.title)}
                        helperText={errors.title?.message}
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        fullWidth
                        rows={4}
                        {...register('description', { required: 'Description is required' })}
                        error={Boolean(errors.description)}
                        helperText={errors.description?.message}
                    />
                    <Autocomplete
                        id="disable-close-on-select"
                        disableCloseOnSelect
                        fullWidth
                        options={top100Films}
                        control={control}
                        defaultValue={editData?.priority}
                        renderInput={(params) => 
                        <TextField 
                        {...params} 
                        label="Priority"    
                        {...register('priority', { required: 'Priority is required' })}
                        error={Boolean(errors.priority)}
                        helperText={errors.priority?.message} 
                        />}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        label="Due Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        defaultValue={currentDate}
                        {...register('dueDate', { required: 'Due Date is required' })}
                        error={Boolean(errors.dueDate)}
                        helperText={errors.dueDate?.message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ManageTodo