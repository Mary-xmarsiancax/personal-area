import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedId, setUsers, userDelete} from "../../../store/users-reducer";
import {AppState} from "../../../store/redux-store";
import {User} from "../../../services/api-types";
import "./users.css"
import {Divider, InputBase, Paper} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {UserFormDialog} from "../../user-form-dialog/UserFormDialog";

const Users: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch()
    const [inputsText, setInputsText] = useState("")
    const users = useSelector<AppState>((state) => state.usersStore.users) as Array<User>
    const selectedId = useSelector<AppState>((state) => state.usersStore.selectedId) as number
    const [editUser, setEditUser] = useState<null | User>(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(setUsers())
    }, [])

    const onAddUser = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setEditUser(null)
    }

    const onSelect = (id: number) => {
        dispatch(setSelectedId(id))
    }

    const onDeleteUser = () => {
        dispatch(userDelete(selectedId))
    }

    const onChangeTasksInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputsText(e.target.value)
    }

    const usersListEl = users.filter((user) => {
        return user.surname.toLowerCase().includes(inputsText.toLowerCase()) || user.name.toLowerCase().includes(inputsText.toLowerCase())
    }).map((user) => {
        return (
            <tr key={user.id} onClick={() => onSelect(user.id)} className={selectedId === user.id ? "selected" : ""}>
                <td>{user.surname}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td className={"relative"}>{user.city}
                    <EditIcon onClick={() => setEditUser(user)} className={"edit-icon"}/>
                </td>
            </tr>
        )
    })

    return (
        <div className={"users-wr"}>
            <div className={"users-buttons"}>
                <div className={"search-wr"}>
                    <Paper className="tasks-input"
                           component="form"
                           sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                    >
                        <InputBase onChange={onChangeTasksInput}
                                   sx={{ml: 1, flex: 1}}
                                   placeholder="?????????????? ?????????????? ?????? ??????"
                                   inputProps={{'aria-label': "?????????????? ?????? ??????"}}
                                   value={inputsText}
                        />
                        <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                        <SearchIcon/>
                    </Paper>
                </div>

                <button onClick={onAddUser}>????????????????</button>
                <button onClick={onDeleteUser}>??????????????</button>
            </div>
            <div className={"table-wr"}>
                <table>
                    <thead>
                    <tr className={"table-head"}>
                        <th className={"column1"}>??????????????</th>
                        <th className={"column2"}>??????</th>
                        <th className={"column3"}>??????????????</th>
                        <th className={"column4"}>???????????? ??????????</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usersListEl}
                    </tbody>
                </table>
            </div>
            {(open || !!editUser) && <UserFormDialog open={open || !!editUser} onClose={handleClose} user={editUser}/>}
        </div>
    )
}

export default Users;