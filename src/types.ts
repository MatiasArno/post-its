enum State {
    Init = 'init',
    Checked = 'checked',
    Deleted = 'deleted'
}

export interface Task {
    id: number,
    state: State,
    content: string
}