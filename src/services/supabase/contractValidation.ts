export type ContractContent = { title: string; description: string; terms: string }
export type ContractField = keyof ContractContent
export type ContractErrors = Partial<Record<ContractField, string>>

export const contractLimits = { title: 120, description: 4000, terms: 20000 } as const
export const contractFields: ContractField[] = ['title', 'description', 'terms']
export const contractLabels = { title: 'Título', description: 'Descripción', terms: 'Cláusulas' }
export const countCharacters = (value: string) => Array.from(value).length
export const isContractId = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

// Normalize line endings only. Preserve spaces and Unicode composition; never truncate.
export function normalizeContractContent(input: ContractContent): ContractContent {
  return {
    title: input.title.replace(/\r\n?/g, '\n'),
    description: input.description.replace(/\r\n?/g, '\n'),
    terms: input.terms.replace(/\r\n?/g, '\n'),
  }
}

export function validateContractContent(input: ContractContent): ContractErrors {
  const errors: ContractErrors = {}
  for (const field of contractFields) {
    const value = input[field]
    // Match the existing PostgreSQL btrim CHECK: empty or only U+0020 spaces.
    if (value.replace(/^ +| +$/g, '') === '') {
      errors[field] = `${contractLabels[field]}: completa este campo con contenido.`
    } else if (Array.from(value).some((char) => {
      const point = char.codePointAt(0)!
      return point === 0 || (point >= 0xd800 && point <= 0xdfff)
    })) {
      errors[field] = `${contractLabels[field]}: hay caracteres no válidos. Revisa el texto.`
    } else if (countCharacters(value) > contractLimits[field]) {
      errors[field] = `${contractLabels[field]}: máximo ${contractLimits[field].toLocaleString('es')} caracteres.`
    }
  }
  return errors
}
