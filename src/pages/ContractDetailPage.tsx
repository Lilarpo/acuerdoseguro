import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useAuth } from '../auth/useAuth'
import { ContractContentForm } from '../components/contracts/ContractContentForm'
import { ContractEvidence } from '../components/contracts/ContractEvidence'
import { useContractQuery } from '../components/contracts/useContractQuery'
import { Badge, Button, Card, PageContainer } from '../components/ui'
import { getContractDraftById, updateContractDraft } from '../services/supabase/contracts'
import { isContractId } from '../services/supabase/contractValidation'

function DraftDetail({ id }: { id: string }) {
  const load = useCallback(() => getContractDraftById(id), [id])
  const { result, reload, setResult } = useContractQuery(load)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  if (!result) return <p role="status">Cargando borrador…</p>
  if (!result.ok) return <><p role="alert">{result.code === 'unavailable' ? 'El borrador no está disponible para esta cuenta.' : result.message}</p><Button className="mt-4" onClick={reload}>Volver a consultar</Button></>
  const draft = result.data
  return (
    <>
      {saved && <p role="status" className="mb-4">Cambios guardados correctamente.</p>}
      <Badge>Borrador</Badge>
      <p className="mt-4 text-muted">Creado: <time dateTime={draft.created_at}>{new Date(draft.created_at).toLocaleString('es')}</time></p>
      {editing ? (
        <div className="mt-6">
          <ContractContentForm initialValue={draft} submitLabel="Guardar cambios"
            onSave={(content) => updateContractDraft(id, content)}
            onUnavailable={() => setResult({ ok: false, code: 'unavailable', message: 'El borrador no está disponible para esta cuenta.' })}
            onSaved={(updated) => { setResult({ ok: true, data: updated }); setEditing(false); setSaved(true) }} />
        </div>
      ) : (
        <>
          <h2 className="mt-6 text-2xl font-semibold text-brand wrap-anywhere">{draft.title}</h2>
          <h3 className="mt-6 text-lg font-semibold text-brand">Descripción</h3>
          <p className="mt-2 whitespace-pre-wrap wrap-anywhere">{draft.description}</p>
          <h3 className="mt-6 text-lg font-semibold text-brand">Cláusulas y condiciones</h3>
          <p className="mt-2 whitespace-pre-wrap wrap-anywhere">{draft.terms}</p>
          <Button className="mt-6" onClick={() => { setEditing(true); setSaved(false) }}>Editar borrador</Button>
        </>
      )}
      <ContractEvidence draft={draft} editing={editing} />
    </>
  )
}

export function ContractDetailPage() {
  const { id = '' } = useParams<'id'>()
  const { user } = useAuth()
  return (
    <PageContainer className="py-10 sm:py-14">
      <h1 className="text-3xl font-semibold text-brand">Detalle del acuerdo</h1>
      <Card className="mt-6 max-w-3xl">
        {user && isContractId(id) ? <DraftDetail key={user.id + ':' + id} id={id} /> : <p role="alert">El borrador no está disponible para esta cuenta.</p>}
      </Card>
      <Link to="/panel" className="mt-6 inline-flex min-h-11 items-center text-accent-strong underline">Volver al panel</Link>
    </PageContainer>
  )
}
