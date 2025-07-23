import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PetsIcon from '@mui/icons-material/Pets'
import QueryStatsIcon from '@mui/icons-material/QueryStats';

// Archivo con un array de rutas 

// Rutas de usuarios
export const ROUTESUSER = [
    { path: "/profile", label: "Perfil", icon:<AccountCircleIcon /> },
    { path: "/dashboard", label: "Explorar", icon: <DashboardCustomizeIcon />},
    { path: "/match", label: "Me gustas", icon: <FavoriteIcon />},
    { path: "/my-pets", label: "Mis Mascotas", icon: <PetsIcon />}
]


// Rutas extras en modo Admin
export const ROUTEADMIN = [
    { path: "/admin/statistics", label: "Estadísticas", icon:<QueryStatsIcon />},
]
