import CardList from "../../../component/CardList";

const TargetByStatus = ({chatting_names, waiting_names, accept_names, onSubmit, loading}) => {
    return (
        <>
            <CardList data={chatting_names} title={"Chatting"} onSubmit={onSubmit} loading={loading}/>
            <CardList data={waiting_names} title={"Waiting"} onSubmit={onSubmit} loading={loading} />
            <CardList
                data={accept_names}
                title={"Accept"}
                description={"Here are Unmessaged Person List. Please send the first message them"} 
                onSubmit={onSubmit}
                loading={loading}
            />
        </>
    )
}

export default TargetByStatus;