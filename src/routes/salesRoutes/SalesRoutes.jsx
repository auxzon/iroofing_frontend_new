import { Route, Routes } from 'react-router-dom'
import SalesDashboard from '../../SalesDashboard/pages/SalesDashboard'
import SalesAddnewClient from '../../SalesDashboard/pages/SalesAddnewClient'
import SalesCustomers from '../../SalesDashboard/pages/SalesCustomers'
import QuickEstimate from '../../SalesDashboard/pages/QuickEstimate'
import FinalEstimate from '../../SalesDashboard/pages/FinalEstimate'
import SalesSettings from '../../SalesDashboard/pages/SalesSettings'
import ViewQuotation from '../../SalesDashboard/pages/ViewQuotation'

const SalesRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<SalesDashboard />} />
            <Route path="/addnewclient" element={<SalesAddnewClient />} />
            <Route path="/salescustomers" element={<SalesCustomers />} />
            <Route path="/quickestimate" element={<QuickEstimate />} />
            <Route path="/finalestimate" element={<FinalEstimate />} />
            <Route path="settings" element={<SalesSettings />} />
            <Route path="viewquotation" element={<ViewQuotation />} />
        </Routes>

    )
}

export default SalesRoutes   
