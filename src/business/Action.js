export const Action = {
    Left: "Left",
    Right: "Right",
    FastDrop: "FastDrop",
    SlowDrop: "SlowDrop",
    Quit: "Quit",
    Pause: "Pause",
    Rotate: "Rotate"
}

export const key = {
    ArrowLeft: Action.Left,
    ArrowRight: Action.Right,
    ArrowDown: Action.SlowDrop,
    ArrowUp: Action.Rotate,
    Space: Action.FastDrop,
    KeyQ: Action.Quit,
    KeyP: Action.Pause,
}

export const actionForKey = keyCode => key[keyCode]

export const actionIsDrop = action => (
    [Action.FastDrop, Action.SlowDrop].includes(action)
)