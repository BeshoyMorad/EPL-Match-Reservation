"use client";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import instance from "@/services/instance";

const handleDelete = async (username: string) => {
  await instance.delete("/remove-user/", { data: { username } });
  window.location.reload();
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 240 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "username", headerName: "Username", width: 200 },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
        <>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.username)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </>
      );
    },
  },
];

export default function ManageUsers() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await instance.get("/users");

      const updatedUsers = response.data.map((user: IUser) => {
        return {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      });
      setUsers(updatedUsers);
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
