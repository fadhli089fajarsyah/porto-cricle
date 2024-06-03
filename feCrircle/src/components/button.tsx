

const Buton = (props: any) => {
    return (
        <div
            className={`
            bg-[#04A51E]
            py-3 rounded-full
            ${props.clas}`}
        >
            {props.textbuton}
        </div>
    )
}

export default Buton
