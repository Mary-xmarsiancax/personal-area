import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUser, setSelectedId, setUsers, userDelete} from "../../../store/users-reducer";
import {AppState} from "../../../store/redux-store";
import {User} from "../../../services/api-types";
import "./users.css"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useForm} from "react-hook-form";

const Users: React.FC = (): React.ReactElement => {
    let dispatch = useDispatch()
    const users = useSelector<AppState>((state) => state.usersStore.users) as Array<User>;
    const selectedId = useSelector<AppState>((state) => state.usersStore.selectedId) as number;

    useEffect(() => {
        dispatch(setUsers());
    }, [])

    const {register, handleSubmit} = useForm<User>()
    const [open, setOpen] = useState(false)

    const onAddUser = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const onSubmit = handleSubmit((data) => {
        dispatch(addUser(data))
        setOpen(false)
    })

    const onSelect = (id: number) => {
        dispatch(setSelectedId(id))
    }

    const onDeleteUser = () => {
        dispatch(userDelete(selectedId))
    }

    const usersListEl = users.map((user) => {
        return (
            <tr key={user.id} onClick={() => onSelect(user.id)} className={selectedId === user.id ? "selected" : ""}>
                <td className={"column1"}>{user.surname}</td>
                <td className={"column2"}>{user.name}</td>
                <td className={"column3"}>{user.age}</td>
                <td className={"column4"}>{user.city}</td>
            </tr>
        )
    })


    return (
        <div className={"users-wr"}>
            <div className={"users-buttons"}>
                <button onClick={onAddUser}>Добавить</button>
                <button onClick={onDeleteUser}>Удалить</button>
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
                <form onSubmit={onSubmit}>
                    <DialogTitle>Новый контакт</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Информация о новом контакте
                        </DialogContentText>

                        <TextField {...register("surname")}
                                   autoFocus
                                   margin="dense"
                                   id="surname"
                                   label="Фамилия"
                                   type="text"
                                   fullWidth
                                   variant="standard"
                        />
                        <TextField {...register("name")}
                                   autoFocus
                                   margin="dense"
                                   id="name"
                                   label="Имя"
                                   type="text"
                                   fullWidth
                                   variant="standard"
                        />
                        <TextField {...register("age")}
                                   autoFocus
                                   margin="dense"
                                   id="age"
                                   label="Возраст"
                                   type="number"
                                   fullWidth
                                   variant="standard"
                        />
                        <TextField {...register("city")}
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
                        <Button type="submit" value="submit" onClick={onSubmit}>Сохранить</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
export default Users;