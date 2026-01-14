import data from "../../../../shared/DataStore/Admin/Revenue.json"
import RevenueReports from "../../../../shared/TestReports/RevenueReports";
export default function Reports() {
    return (
        <div className="flex flex-col gap-3">

            <RevenueReports data={data} />
        </div>
    )
}