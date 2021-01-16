import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MoveChange, NgxChessBoardComponent } from 'ngx-chess-board';
import { PieceIconInput } from 'ngx-chess-board';
import { FenComponent } from './components/fen/fen.component';
import { MovesComponent } from './components/moves/moves.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild('board')
    boardManager: NgxChessBoardComponent;

    @ViewChild('fenManager') fenManager: FenComponent;
    public fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
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
    public lightDisabled = false;
    public darkDisabled = false;
    public white = true;

    public reset(): void {
        this.boardManager.reset();
        this.fen = this.boardManager.getFEN();
    }

    public reverse(): void {
        this.boardManager.reverse();
    }

    public undo(): void {
        this.boardManager.undo();
        this.fen = this.boardManager.getFEN();
    }

    public setFen(): void {
        if (this.fen) {
            this.boardManager.setFEN(this.fen);
        }
    }

    public moveCallback(move: MoveChange): void {
        this.fen = this.boardManager.getFEN();
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
                text: `Unfortunately, it's a Stalemate`,
                icon: 'error',
                confirmButtonText: 'Okay !'
            });
        }
        this.white = !this.white;
        console.log(move);
    }

    public moveManual(): void {
        this.boardManager.move(this.manualMove);
    }

    getFEN() {
        let fen = this.boardManager.getFEN();
        alert(fen);
    }

    showMoveHistory() {
        console.log(this.boardManager.getMoveHistory());
        alert(JSON.stringify(this.boardManager.getMoveHistory()));
    }

    switchDrag() {
        this.dragDisabled = !this.dragDisabled;
    }

    switchDraw() {
        this.drawDisabled = !this.drawDisabled;
    }

    switchDarkDisabled() {
        this.darkDisabled = !this.darkDisabled;
    }

    switchLightDisabled() {
        this.lightDisabled = !this.lightDisabled;
    }

}
