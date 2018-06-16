

export interface Task {
    description: string
    position: number
    complete: boolean
}

export interface Quest {
    id: string
    title: string
    description: string
    tasks: Task[]
}