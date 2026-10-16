import { BrowserRouter, Route, Routes } from 'react-router'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<PlaceholderPage title="Inicio de sesión" />} />
          <Route path="registro" element={<PlaceholderPage title="Registro" />} />
          <Route path="panel" element={<PlaceholderPage title="Panel de usuario" />} />
          <Route path="contratos/nuevo" element={<PlaceholderPage title="Crear contrato" />} />
          <Route path="contratos/:id" element={<PlaceholderPage title="Detalle de contrato" />} />
          <Route path="verificar" element={<PlaceholderPage title="Verificación documental" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
