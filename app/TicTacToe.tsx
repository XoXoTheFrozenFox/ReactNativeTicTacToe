import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const size = 3; // Grid size

const TicTacToe = () => {
  const [board, setBoard] = useState<string[][]>(Array(size).fill(null).map(() => Array(size).fill(null)));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winningCells, setWinningCells] = useState<{ row: number, col: number }[] | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const result = calculateWinner(board);
    setWinner(result.winner);
    setWinningCells(result.winningCells);
  }, [board]);

  // Function to handle cell press
  const handlePress = (row: number, col: number) => {
    if (board[row][col] || winner) return; // Ignore if cell is already filled or game is won

    const newBoard = board.map(row => row.slice());
    newBoard[row][col] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(size).fill(null).map(() => Array(size).fill(null)));
    setIsXNext(true);
    setWinningCells(null);
    setWinner(null);
  };

  // Function to render each cell
  const renderCell = (row: number, col: number) => {
    const value = board[row][col];
    const isWinningCell = winningCells && winningCells.some(cell => cell.row === row && cell.col === col);

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[styles.cell, isWinningCell && styles.winningCell]}
        onPress={() => handlePress(row, col)}
      >
        {value && (
          <Text style={[styles.text, value === 'X' ? styles.xText : styles.oText, isWinningCell && styles.winningText]}>
            {value}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  // Function to calculate the winner
  const calculateWinner = (board: string[][]) => {
    // Initialize winning cells and winner
    let winningCells: { row: number, col: number }[] = [];
    let winner: string | null = null;

    // Check rows and columns
    for (let i = 0; i < size; i++) {
      if (board[i][0] && board[i].every(cell => cell === board[i][0])) {
        winner = board[i][0];
        winningCells = board[i].map((_, index) => ({ row: i, col: index }));
        return { winner, winningCells };
      }
      if (board[0][i] && board.every(row => row[i] === board[0][i])) {
        winner = board[0][i];
        winningCells = board.map((_, index) => ({ row: index, col: i }));
        return { winner, winningCells };
      }
    }

    // Check diagonals
    if (board[0][0] && board.every((row, i) => row[i] === board[0][0])) {
      winner = board[0][0];
      winningCells = board.map((_, index) => ({ row: index, col: index }));
      return { winner, winningCells };
    }
    if (board[0][size - 1] && board.every((row, i) => row[size - 1 - i] === board[0][size - 1])) {
      winner = board[0][size - 1];
      winningCells = board.map((_, index) => ({ row: index, col: size - 1 - index }));
      return { winner, winningCells };
    }

    return { winner: null, winningCells: [] };
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        {winner ? (
          <View style={styles.messageContainer}>
            <Text style={styles.winnerText}>{winner} Wins!</Text>
          </View>
        ) : (
          <Text style={styles.infoText}>Next Player: {isXNext ? 'X' : 'O'}</Text>
        )}
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Replay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Black background color
  },
  gameContainer: {
    marginBottom: 20,
    alignItems: 'center', // Center contents horizontally
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'purple', // Purple border color
    shadowColor: 'purple', // Purple hue effect for the grid
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5, // For Android shadow effect
  },
  winningCell: {
    borderColor: 'purple', // Keeps the border color for winning cells
    backgroundColor: 'rgba(128, 0, 128, 0.2)', // Light purple background for winning cells
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  xText: {
    color: 'orange',
    textShadowColor: 'orange', // Neon orange shadow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10, // Adjust shadow radius to create the glow effect
  },
  oText: {
    color: '#FF69B4', // Neon pink color
    textShadowColor: '#FF69B4', // Neon pink shadow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10, // Adjust shadow radius to create the glow effect
  },
  winningText: {
    textDecorationLine: 'line-through', // Line through winning text
    textDecorationStyle: 'solid',
    textDecorationColor: 'rgba(255, 255, 255, 0.6)', // Light color for the line through text
  },
  infoText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center', // Center text
    color: '#89CFF0', // Baby blue color
    textShadowColor: '#89CFF0', // Baby blue shadow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10, // Adjust shadow radius to create the glow effect
  },
  winnerText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center', // Center text
    color: '#89CFF0', // Baby blue color
    textShadowColor: '#89CFF0', // Baby blue shadow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10, // Adjust shadow radius to create the glow effect
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'purple', // Purple background color for the button
    borderRadius: 5,
    shadowColor: 'purple', // Purple hue effect for the button
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5, // For Android shadow effect
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TicTacToe;
