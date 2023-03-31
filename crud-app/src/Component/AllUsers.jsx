import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
  ButtonGroup,
} from "@mui/material";
import { getUsers, deleteUser } from "../Service/api";
import { Link } from "react-router-dom";

const Container = styled(ButtonGroup)`
  margin-left: 35px;
  margin-top: 25px;
`;

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: #ffffff;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };
  var messageArray = [];

  const getSelectedUsers = () => {
    messageArray = [];
    const checkboxes = document.getElementsByTagName("input");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        var row = checkboxes[i].parentNode.parentNode;
        const messagerow = {
          id: row.cells[0].innerHTML,
          name: row.cells[2].innerHTML,
          hobbies: row.cells[3].innerHTML,
          email: row.cells[4].innerHTML,
          phone: row.cells[5].innerHTML,
        };
        messageArray.push(messagerow);
      }
    }
    return `
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Hobbies</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        ${messageArray
          .map((message) => {
            return `<tr>
            <td>${message.id}</td>
            <td>${message.name}</td>
            <td>${message.hobbies}</td>
            <td>${message.email}</td>
            <td>${message.phone}</td>
          </tr>`;
          })
          .join("\n")}
      </tbody>
    </table>`;
  };

  const sendEmail = async () => {
    const message = getSelectedUsers();

    const emailHtml = message;
    try {
      const resp = await axios.post("https://crud-2hj0.onrender.com/send-mail", {
        emailHtml,
      });

      const data = resp.data;

      if (data.success) {
        alert(data.message);
      } else {
        alert("There was a problem sending email");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Select</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Hobbies</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell></TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>

              {/* change it to user.id to use JSON Server */}
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.hobbies}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/edit/${user._id}`}
                >
                  Edit
                </Button>
                {/* change it to user.id to use JSON Server */}
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => deleteUserData(user._id)}
                >
                  Delete
                </Button>
                {/* change it to user.id to use JSON Server */}
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
      <Container>
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={() => sendEmail()}
          >
            Send Selected Users
          </Button>
        </ButtonGroup>
      </Container>
    </div>
  );
};

export default AllUsers;
