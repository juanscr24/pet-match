export const StatsCard = ({ title, value, Icon }) => (
    <div className="bg-black/40 rounded-2xl shadow-md p-6 flex flex-col items-center gap-2">
        {Icon && <Icon className="text-5xl text-white/60" />}
        <h3 className="text-lg font-semibold text-white text-center">{title}</h3>
        <p className="text-3xl font-bold text-gray-200">{value}</p>
    </div>
);