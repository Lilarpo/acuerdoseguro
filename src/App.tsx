import { BrowserRouter, Route, Routes } from 'react-router'
import { AppLayout } from './components/layout/AppLayout'
import { ContractDetailPage } from './pages/ContractDetailPage'
import { CreateContractPage } from './pages/CreateContractPage'
import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RegisterPage } from './pages/RegisterPage'
import { VerifyDocumentPage } from './pages/VerifyDocumentPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registro" element={<RegisterPage />} />
          <Route path="panel" element={<DashboardPage />} />
          <Route path="contratos/nuevo" element={<CreateContractPage />} />
          <Route path="contratos/:id" element={<ContractDetailPage />} />
          <Route path="verificar" element={<VerifyDocumentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
