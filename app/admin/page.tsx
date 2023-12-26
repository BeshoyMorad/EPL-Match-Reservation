"use client";
import { Button, Divider, Grid, Paper } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import CakeIcon from "@mui/icons-material/Cake";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect, useState } from "react";
import { userRequest } from "@/services/instance";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
export default function AdminPanel() {
  const router = useRouter();

  const [users, setUsers] = useState<IUser[]>([]);
  const [cookies, setCookies] = useCookies(["token"]);
  if (!cookies.token) {
    router.refresh();

    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log(cookies.token);
    if (cookies.token) {
      const fetchUsers = async () => {
        const response = await userRequest
          .get("/unverified-users")
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => {
            console.log(err);
              // router.refresh();
            window.location.reload();
          });
      };

      fetchUsers();
    } else {
      router.refresh();
    }
    router.refresh();
  }, [cookies.token]);

  const approveUser = async (username: string) => {
    await userRequest.post("/approve-user", { username });
    const updatedUsers = users.filter((user) => user.username !== username);
    setUsers(updatedUsers);
  };

  return (
    <>
      {users.length === 0 && (
        <h1 className="text-3xl font-bold text-center">No Users Yet</h1>
      )}
      <Grid container gap={2}>
        {users.map((user) => (
          <Grid item key={user._id}>
            <Paper elevation={4} sx={{ borderRadius: "1rem" }}>
              <div className="p-4">
                <h6 className="text-gray-500">{user.username}</h6>
                <h5 className="font-semibold text-xl text-[var(--main-color)]">
                  {user.firstName} {user.lastName}
                </h5>
                <h6 className="text-gray-500 mb-2">{user.email}</h6>

                {user.gender === "male" ? (
                  <div className=" bg-blue-500 w-fit px-2 py-1 rounded-lg text-white">
                    <MaleIcon /> Male
                  </div>
                ) : (
                  <div className=" bg-pink-600 w-fit px-2 py-1 rounded-lg text-white">
                    <FemaleIcon /> Female
                  </div>
                )}

                <div className="flex items-center justify-between my-4">
                  <div className="flex items-center gap-1">
                    <CakeIcon /> {moment(user.birthDate).format("DD MMM YYYY")}
                  </div>

                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                  <div className="flex items-center gap-1">
                    <GroupIcon /> {user.role}
                  </div>
                </div>

                <Button
                  sx={{
                    border: "1px solid #3988f4",
                  }}
                  onClick={() => approveUser(user.username)}
                >
                  <CheckCircleOutlineIcon /> Approve
                </Button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
