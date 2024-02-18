export default function ProjectCard({icon, name, logoStyle, description, date, children}) {
  return (
    <div className="hero bg-transparent border-black dark:border-white rounded-3xl cursor-pointer p-4" style={{ border: "1px solid" }}>
        <div className="flex flex-col items-start w-full gap-4 lg:gap-0 lg:h-full justify-between" style={{ maxWidth: "unset" }}>
            <div className="flex gap-4 sm:flex-col flex-row justify-between items-center sm:items-start w-full">
                <img src={icon} className='h-16 w-16 rounded-2xl' alt={`${name} icon`}></img>
                <h1 className="text-5xl font-bold" style={logoStyle}>{name}</h1>
            </div>
            <div className='flex flex-col sm:flex-row w-full justify-between' style={{fontFamily: 'Roboto Mono'}}>
                <div className="flex flex-col">
                    <p>{description}</p>
                    <p className='text-neutral-500'>{date}</p>
                </div>
                {children}
            </div>
        </div>
    </div>
  )
}
