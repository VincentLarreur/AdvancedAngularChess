import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MoveChange, NgxChessBoardComponent } from 'ngx-chess-board';
import { PieceIconInput } from 'ngx-chess-board';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild('board')
    boardManager: NgxChessBoardComponent;

    private currentStateIndex: number;
    manualMove = 'd2d4';
    public icons: PieceIconInput = {
        blackBishopUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/bb.png',
        blackKingUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/bk.png',
        blackKnightUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/bn.png',
        blackPawnUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/bp.png',
        blackQueenUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/bq.png',
        blackRookUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/br.png',
        whiteBishopUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/wb.png',
        whiteKingUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/wk.png',
        whiteKnightUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/wn.png',
        whitePawnUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/wp.png',
        whiteQueenUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/wq.png',
        whiteRookUrl: 'https://images.chesscomfiles.com/chess-themes/pieces/light/150/wr.png'
    };

    public darkTileColor = '#7B9FB6';
    public lightTileColor = '#DAE3E8';
    public size = 500;
    public dragDisabled = false;
    public drawDisabled = false;
    public white = true;
    public bot = false;
    public botlevel = 0;
    fakeArray = new Array(8);


    public reset(): void {
        this.boardManager.reset();
        this.botlevel = 0;
    }

    public reverse(): void {
        this.boardManager.reverse();
    }

    public undo(): void {
        this.boardManager.undo();
    }

    public moveCallback(move: MoveChange): void {
        if(move.checkmate) {
            Swal.fire({
                title: 'Checkmate !',
                text: `Congrats, ${move.color} won`,
                icon: 'success',
                confirmButtonText: 'Okay !'
            });
        } else if(move.stalemate) {
            Swal.fire({
                title: 'Stalemate...',
                text: 'Unfortunately, it\'s a Stalemate',
                icon: 'error',
                confirmButtonText: 'Okay !'
            });
        }
        this.white = !this.white;
    }

    public moveManual(): void {
        this.boardManager.move(this.manualMove);
    }

    showMoveHistory() {
        alert(JSON.stringify(this.boardManager.getMoveHistory()));
    }

    switchBot() {
        console.log(window);
        if(window.location.host != 'localhost:8080') {
            Swal.fire({
                title: 'Functionality unavailable',
                text: 'This functionnality is only available on localhost origin (local development). This website is not whitelisted to call the Lichess API, used for the bot. Clone and launch the chess project locally to play against Stockfish',
                icon: 'error',
                confirmButtonText: 'Okay !  '
            });
        } else {
            this.bot = !this.bot;
        }
    }

    setBotLevel(level: number) {
        this.botlevel = level;
    }

}
