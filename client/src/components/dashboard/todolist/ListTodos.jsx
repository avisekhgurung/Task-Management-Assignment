import React, { Fragment, useState, useEffect } from "react";
import { Box, Chip, Icon, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridToolbar } from '@mui/x-data-grid';
import VerifiedIcon from '@mui/icons-material/Verified';
import { toast } from "react-toastify";
import ManageTodo from "./ManageTodo";

const ListTodos = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]); //useState to set todos to
  const [loading, setLoading] = useState(false)
  const [editOpen, setEditOpen] = useState({ open: false, data: null });

  //delete todo function


  async function deleteTodo(id) {
    setLoading(true)
    try {
      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
      toast.success('Task deleted successfully')
      setTodosChange(true)
      setLoading(false)
    } catch (err) {
      console.error(err.message);
      setLoading(false)
    }
  }

  async function statusComplete(id) {
    setLoading(true)
    try {
      const body = { status: 'completed' };
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/dashboard/todos/${id}/status`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      toast.success('Task Completed successfully')
      setTodosChange(true)
      setLoading(false)
    } catch (err) {
      console.error(err.message);
      setLoading(false)
    }
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Sr No',
      width: 90,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params?.row.status === 'completed' ? 
            <p style={{textDecoration: 'line-through'}}>{params?.value}</p> 
            : 
            params?.value
            }
          </>

        )
      }
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.value === "High" && <Chip label="High" color="error" variant="outlined" />}
            {params.value === "Moderate" && <Chip label="Moderate" color="warning" variant="outlined" />}
            {params.value === "Low" && <Chip label="Low" color="success" variant="outlined" />}
          </>
        )
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.value === "completed" && <Chip label="Completed" color="primary" variant="outlined" />}
            {params.value === "pending" && <Chip label="Pending" color="warning" variant="outlined" />}
          </>
        )
      }
    },
    {
      field: 'due_date',
      headerName: 'Due Date',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        return (
          <Box>
            <Tooltip title="Delete">
              <IconButton onClick={() => deleteTodo(params.row.todo_id)} >
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={() => setEditOpen({ open: true, data: params.row })}>
                <EditIcon style={{ color: "#163340" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Completed">
              <IconButton onClick={() => statusComplete(params.row.todo_id)}>
                <VerifiedIcon style={{ color: '#A8DF8E' }} />
              </IconButton>
            </Tooltip>
          </Box>
        )
      },
      headerAlign: 'left',
      align: 'left'
    }

  ]

  const filterTodo = allTodos?.filter((i) => i?.title !== null )
  const rows = columns && filterTodo.map((i, index) => {
      return {
        ...i,
        id: index + 1,
        title: i?.title,
        description: i?.description,
        priority: i?.priority,
        due_date: i?.due_date,
        status: i?.status
      }
  })

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <Fragment>
      <Box sx={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pinnedColumns: { left: ['actions'] } }}
          pageSizeOptions={[5]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          loading={loading}

        />
      </Box>
      {editOpen.open && <ManageTodo
        handleClose={() => setEditOpen({ open: false, data: null })}
        open={editOpen.open}
        setTodosChange={setTodosChange}
        edit={true}
        editData={editOpen.data}
      />}
    </Fragment>
  );
};

export default ListTodos;
