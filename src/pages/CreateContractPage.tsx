import { Link, useNavigate } from 'react-router'
import { ContractContentForm } from '../components/contracts/ContractContentForm'
import { Card, PageContainer } from '../components/ui'
import { createContractDraft } from '../services/supabase/contracts'

export function CreateContractPage() {
  const navigate = useNavigate()
  return (
    <PageContainer className="py-10 sm:py-14">
      <h1 className="text-3xl font-semibold text-brand">Crear acuerdo</h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-ink">
        Guarda un borrador privado con título, descripción y cláusulas. Solo se guardan estos tres campos.
        Participantes, invitaciones, firmas y evidencia blockchain todavía no están habilitados.
      </p>
      <Card className="mt-8 max-w-3xl">
        <ContractContentForm submitLabel="Guardar borrador" onSave={createContractDraft}
          onSaved={(draft) => navigate('/contratos/' + draft.id, { replace: true })} />
      </Card>
      <Link to="/panel" className="mt-6 inline-flex min-h-11 items-center text-accent-strong underline">Volver al panel</Link>
    </PageContainer>
  )
}
