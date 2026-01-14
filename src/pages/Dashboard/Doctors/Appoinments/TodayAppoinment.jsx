import Table from "../../../../shared/Tables/DoctorAppoinment"
export default function TodayAppoinment() {
    return (
        <div>
            <Table filterBy={"Today"}/>
        </div>
    )
}