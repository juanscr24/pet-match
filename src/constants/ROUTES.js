import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PetsIcon from '@mui/icons-material/Pets'
import QueryStatsIcon from '@mui/icons-material/QueryStats';


export const ROUTESUSER = [
    { path: "/profile", label: "Profile", icon:<AccountCircleIcon /> },
    { path: "/dashboard", label: "Dashboard", icon: <DashboardCustomizeIcon />},
    { path: "/match", label: "Match", icon: <FavoriteIcon />},
    { path: "/my-pets", label: "My Pets", icon: <PetsIcon />}
]



export const ROUTEADMIN = [
    { path: "/admin/statistics", label: "statistics", icon:<QueryStatsIcon />},
]
