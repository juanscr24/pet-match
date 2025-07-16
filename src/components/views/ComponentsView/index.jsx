import { Alert, Avatar, Button, Input, Label, Typography } from "@/components/atoms"
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const ComponentsView = () => {
    return (
        <div>
            <Alert
                message={'Hola a todos'}
                type="success"
                className="w-fit"
            />
            <Avatar
                src={'/img/prueba.webp'}
                alt="Img de prueba"
                width={3000}
                height={3000}
                className="rounded-full w-52 h-52 object-cover"
            />
            <Button
                className="w-20 h-10"
                children='Send'
                variant="danger"
            />

            <Label
                htmlFor='input'
                children='Escribe tu nombre'
            />

            <PersonAddIcon />

            <Input
                placeholder='Enviar'
                name='input'
                className="w-96 h-10 placeholder:p-3"
            />

            <Typography
                variant="subtitle"
                color="text-red-500"
                className="font-serif"
                children={'Hola a todos, este es un subtitulo'}
            />
        </div>
    )
}
