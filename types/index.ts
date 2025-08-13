// Re-export the ExampleRecord type from airtable lib
export type { ExampleRecord } from '../lib/airtable'

// Additional types can be added here as needed
export interface SearchFilters {
  searchTerm: string
  selectedCategory: string
}

export interface ModalState {
  isOpen: boolean
  selectedExample: ExampleRecord | null
}
