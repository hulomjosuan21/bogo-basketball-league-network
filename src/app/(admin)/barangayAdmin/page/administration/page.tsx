import {getBarangay} from "@/actions/barangayActions";
import BarangayAdministrationComponent from "@/components/barangay-administrationComponent";

export default async function Page(){
    const { barangay } = await getBarangay()

    if(!barangay) {
        throw new Error("Barangay not found!")
    }
    return (
        <main>
            <BarangayAdministrationComponent barangayData={barangay} />
        </main>
    )
}