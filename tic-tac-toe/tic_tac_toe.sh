#!/bin/bash

initialize_board() {
    board=(" " " " " " " " " " " " " " " " " ")
}

print_board() {
    echo " ${board[0]} | ${board[1]} | ${board[2]} "
    echo "-----------"
    echo " ${board[3]} | ${board[4]} | ${board[5]} "
    echo "-----------"
    echo " ${board[6]} | ${board[7]} | ${board[8]} "
}

check_winner() {
    # rows
    for i in 0 3 6; do
        if [[ ${board[$i]} == $1 && ${board[$i+1]} == $1 && ${board[$i+2]} == $1 ]]; then
            return 0
        fi
    done

    # columns
    for i in 0 1 2; do
        if [[ ${board[$i]} == $1 && ${board[$i+3]} == $1 && ${board[$i+6]} == $1 ]]; then
            return 0
        fi
    done

    # diagonals
    if [[ ${board[0]} == $1 && ${board[4]} == $1 && ${board[8]} == $1 ]]; then
        return 0
    elif [[ ${board[2]} == $1 && ${board[4]} == $1 && ${board[6]} == $1 ]]; then
        return 0
    fi

    return 1
}

check_draw() {
    for cell in "${board[@]}"; do
        if [[ $cell == " " ]]; then
            return 1
        fi
    done
    return 0
}

play_game() {
    initialize_board

    player="X"

    while true; do
        clear
        echo "Tic Tac Toe"
        print_board

        if check_winner "X"; then
            clear
            echo "Player X wins!"
            print_board
            break
        elif check_winner "O"; then
            clear
            echo "Player O wins!"
            print_board
            break
        fi

        if check_draw; then
            clear
            echo "It's a draw!"
            print_board
            break
        fi

        echo "Player $player's turn (1-9): "
        read -r move

        if [[ ! $move =~ ^[1-9]$ || ${board[$move-1]} != " " ]]; then
            echo "Invalid move. Please try again."
            sleep 1
            continue
        fi

        board[$move-1] = $player

        if [[ $player == "X" ]]; then
            player="O"
        else
            player="X"
        fi
    done
}

play_game
