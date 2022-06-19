const className = "tetromino"

export const TETROMINOES = {
    I: {
        shape: [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0]
        ],
        className: `${className} ${className}__i`
      },
      J: {
        shape: [
          [0, 1, 0],
          [0, 1, 0],
          [1, 1, 0]
        ],
        className: `${className} ${className}__j`
      },
      L: {
        shape: [
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 1]
        ],
        className: `${className} ${className}__l`
      },
      O: {
        shape: [
          [1, 1],
          [1, 1]
        ],
        className: `${className} ${className}__o`
      },
      S: {
        shape: [
          [0, 1, 1],
          [1, 1, 0],
          [0, 0, 0]
        ],
        className: `${className} ${className}__s`
      },
      T: {
        shape: [
          [1, 1, 1],
          [0, 1, 0],
          [0, 0, 0]
        ],
        className: `${className} ${className}__t`
      },
      Z: {
        shape: [
          [1, 1, 0],
          [0, 1, 1],
          [0, 0, 0]
        ],
        className: `${className} ${className}__z`
      }
    }

export const randomTetrominoes = () => {
    const keys = Object.keys(TETROMINOES)
    const index = Math.floor(Math.random() * keys.length)
    const key = keys[index]
    return TETROMINOES[key]
}

export const rotate = ({matrix, direction}) => {
  // transpose
  const newMatrix = matrix.map((_,y) => (
    matrix.map(col => col[y])
  ))

  if(direction > 0) return newMatrix.map(row => row.reverse())
  return newMatrix.reverse()
}