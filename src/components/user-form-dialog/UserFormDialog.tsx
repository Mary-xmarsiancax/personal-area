import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {User} from "../../services/api-types";
import {addUser, updateUser} from "../../store/users-reducer";
import {useDispatch} from "react-redux";

type UserFormDialogProps = {
    open: boolean;
    onClose: () => void;
    user: User | null;
}

export const UserFormDialog: React.FC<UserFormDialogProps> = ({
                                                                  open, onClose, user
                                                              }) => {
    const {register, handleSubmit, formState} = useForm<User>({
        defaultValues: {
            name: user?.name,
            surname: user?.surname,
            age: user?.age,
            city: user?.city,
            id: user?.id
        }
    });
    let dispatch = useDispatch()

    const onSubmit = handleSubmit((data) => {
        if (user) {
            console.log(data);
            dispatch(updateUser(data))
        } else {
            dispatch(addUser(data))
        }

        onClose();
    })

    return <Dialog open={open} onClose={onClose}>
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
                <Button onClick={onClose}>Отмена</Button>
                <Button type="submit" value="submit" onClick={onSubmit}>Сохранить</Button>
            </DialogActions>
        </form>
    </Dialog>
}