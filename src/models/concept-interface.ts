export interface OntologyConcept  {
    id: number; 
    parent?: string, 
    child?: string, 
    alternateName?: string, 
    displayName: string,
    description?: string
}