enum State {
    Init = 'init',
    Checked = 'checked',
    Focused = 'focused'
}

export interface Task {
    id: number,
    state: State,
    content: string
}