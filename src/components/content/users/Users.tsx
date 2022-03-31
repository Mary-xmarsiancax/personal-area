import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUsers} from "../../../store/users-reducer";
import {AppState} from "../../../store/redux-store";
import {User} from "../../../services/api-types";
import "./users.css"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

const Users = () => {
    const [open, setOpen] = useState(false)
    let dispatch = useDispatch()
    const users = useSelector<AppState>((state) => state.usersStore.users) as Array<User>;
    const usersListEl = users.map((user) => {
        return (
            <tr key={user.id}>
                <td className={"column1"}>{user.surname}</td>
                <td className={"column2"}>{user.name}</td>
                <td className={"column3"}>{user.age}</td>
                <td className={"column4"}>{user.city}</td>
            </tr>
        )
    })

    useEffect(() => {
        dispatch(setUsers());
    }, [])

    const onAddUser = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className={"users-wr"}>
            <div className={"users-buttons"}>
                <button onClick={onAddUser}>Добавить</button>
                <button>Удалить</button>
            </div>
            <div className={"table-wr"}>
                <table>
                    <thead>
                    <tr className={"table-head"}>
                        <th className={"column1"}>Фамилия</th>
                        <th className={"column2"}>Имя</th>
                        <th className={"column3"}>Возраст</th>
                        <th className={"column4"}>Родной город</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usersListEl}
                    </tbody>
                </table>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Новый контакт</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Информация о новом контакте
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="surname"
                        label="Фамилия"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Имя"
                        type="text"
                        fullWidth
                        variant="standard"
                    /><TextField
                        autoFocus
                        margin="dense"
                        id="age"
                        label="Возраст"
                        type="number"
                        fullWidth
                        variant="standard"
                    /><TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        label="Родной город"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleClose}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}
export default Users;