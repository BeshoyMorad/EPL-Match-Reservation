import {
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import CakeIcon from "@mui/icons-material/Cake";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export default function AdminPanel() {
  // Fetch the unverified users then loop on UNVERIFIED_USERS

  // Fetch top recent users then loop on TOP_USERS
  const rows = [
    {
      id: 1,
      username: "username",
      firstname: "firstname",
      lastname: "lastname",
      email: "email",
      birthdate: "birthdate",
      gender: "gender",
    },
    {
      id: 2,
      username: "username",
      firstname: "firstname",
      lastname: "lastname",
      email: "email",
      birthdate: "birthdate",
      gender: "gender",
    },
  ];

  return (
    <>
      <Grid container gap={2}>
        {/* UNVERIFIED_USERS */}
        <Grid item>
          <Paper elevation={4} sx={{ borderRadius: "1rem" }}>
            <div className="p-4">
              <h6 className="text-gray-500">username</h6>
              <h5 className="font-semibold text-xl">FirstName + LastName</h5>
              <h6 className="text-gray-500 py-2">email</h6>

              <div className=" bg-blue-500 w-fit p-1 rounded-lg text-white">
                <MaleIcon /> Male
              </div>

              <div className="flex items-center justify-between my-4">
                <div className="flex items-center gap-1">
                  <CakeIcon /> Birth
                </div>

                <Divider orientation="vertical" flexItem />

                <div className="flex items-center gap-1">
                  <GroupIcon /> Fan
                </div>
              </div>

              <Button
                sx={{
                  border: "1px solid #3988f4",
                }}
              >
                <CheckCircleOutlineIcon /> Approve
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>

      {/* TOP_USERS */}
      <TableContainer component={Paper} sx={{ mt: "1.2rem" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#d5e7ff" }}>
            <TableRow sx={{ fontWeight: "bold" }}>
              <TableCell className="text-lg">User</TableCell>
              <TableCell className="text-lg">Gender</TableCell>
              <TableCell className="text-lg">Birth</TableCell>
              <TableCell className="text-lg" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">
                      {row.username}
                    </span>
                    <span>{row.email}</span>
                  </div>
                </TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.birthdate}</TableCell>
                <TableCell align="center">
                  <Button
                    color="error"
                    variant="contained"
                    sx={{ bgcolor: "#c62828 !important", gap: 1 }}
                  >
                    <PersonRemoveIcon /> Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
