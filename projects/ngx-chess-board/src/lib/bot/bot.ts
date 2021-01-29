import axios, {AxiosInstance} from 'axios';
import { NgxChessBoardComponent } from 'ngx-chess-board';

export class Bot {
    private token = "Bearer TUvmLJRoMO8f6IZp";
    private instance: AxiosInstance; 
    public gameId = null;
    public botlevel: number;
    public playerPlaying: string;
    public playerlastmove;

    constructor() {
        this.instance = axios.create({
            baseURL: 'https://lichess.org',
            headers: {
                'Authorization': this.token
            }
        });
    }

    async start(board: NgxChessBoardComponent) {
        console.log('Starting bot game');
        this.playerlastmove = (this.playerPlaying != 'white');
        const body = {
            level: String(this.botlevel),
            days: '1',
            color: this.playerPlaying
        }
        await this.instance.post('/api/challenge/ai', body).then(response => {
            this.gameId = response.data.id;
            if(this.playerPlaying != 'white') {
                setTimeout(this.getBotmove, 4000, this.instance, this.gameId, board);
            }
        });
    }

    async makeMoove(move: string, board: NgxChessBoardComponent) {
        console.log('Player do ', move);
        await this.instance.post(`/api/board/game/${this.gameId}/move/${move}`)
            .then(() => {
                setTimeout(this.getBotmove, 4000, this.instance, this.gameId, board, move);
            });
    }

    private async getBotmove(instance, gameId, board, move) {
        await instance.get('/api/account/playing')
            .then(response => {
                const game = (response.data.nowPlaying.filter(element => element.gameId == gameId))[0];
                const botmove = game.lastMove;
                if(botmove != move) { // case that lichess take longer to calculate next moove and we get our move as bot move
                    board.move(botmove);
                    console.log('Bot do ', botmove);
                    board.bot.playerlastmove = false;
                } else {
                    setTimeout(this.getBotmove, 4000, instance, gameId, board, move);
                }
            });
    }

    async cleanAccount() {
        console.log('Cleaning Account');
        await this.instance.get('/api/account/playing')
        .then(response => {
            for(let i=0;i<response.data.nowPlaying.length; i++) {
                this.instance.post(`/api/board/game/${response.data.nowPlaying[i].gameId}/resign`);
            }
        });
    }


}