import Link from "next/link";
import { ROUTES } from "@/constants/ROUTES.js"

export default function Navbar() {
    return (
        <nav>
            <ul className="flex gap-5">
                {ROUTES.map((route) => (
                    <li key={route.path}>
                        <Link href={route.path}>{route.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
